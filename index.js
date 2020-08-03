let cityList = [];

function renderBtns(){
    $("#cityBtns").empty();
    cityList = JSON.parse(localStorage.getItem("cityList"));
    if (cityList == null){
        cityList = [];
    };
    for (var i=0; i < cityList.length; i++){
        let city = cityList[i];
        $(`<button type="button" class="btn btn-outline-secondary my-1 btn-block" data-name="${city}">${city}</button>`).prependTo("#cityBtns");
    };
};

$("#clearBtn").on("click", function () {
    localStorage.clear();
    $("#cityBtns").empty();
});

$("#citySearch").on("submit", function (event) {
    event.preventDefault(); 
    let cityInput = $("#cityInput").val();
    if (cityInput === "") {
        return;
    }
    cityList.push(cityInput);
    localStorage.setItem("cityList", JSON.stringify(cityList));

    renderBtns();
    getWeather(cityInput);
});


function getWeather(cityInput){
    let apiKey = "3a2865bfdde9a3d0404b80605b03f65a";
    let queryUrlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`;
    let queryUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}`;
    
    $.ajax({
        url: queryUrlWeather,
        method: "GET",
    }).then(function (response) {
        console.log(response);
    });
    $.ajax({
        url: queryUrlForecast,
        method: "GET",
    }).then(function (response) {
        console.log(response);
    });
    
};

renderBtns();   