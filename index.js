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
    renderBtns();
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

    $("#currentWeather").empty();
    getCurrentWeather(cityInput);
    getForecast(cityInput);
});

let apiKey = "3a2865bfdde9a3d0404b80605b03f65a";

function getCurrentWeather(cityInput){
    let queryUrlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`;
    
    $.ajax({
        url: queryUrlWeather,
        method: "GET",
    }).then(function (response) {
        console.log(response);

        $(`<h2>${cityInput}</h2>
        <p class="card-text">Temperature: ${response.main.temp}</p>
        <p class="card-text">Humidity: ${response.main.humidity}</p>
        <p class="card-text">Wind Speed: ${response.wind.speed}</p>`).appendTo(("#currentWeather"));
        
        let lat = parseInt(response.coord.lat);
        let lon = parseInt(response.coord.lon);
        getUVIndex(lat, lon);
    });
};

function getUVIndex(lat, lon) {
    let queryUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;

    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        $(`<p class="card-text">UV Index: ${response.value}</p>`).appendTo(("#currentWeather"));
    });

};

function getForecast(cityInput) {
    let queryUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}`;
    $.ajax({
        url: queryUrlForecast,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        for (var i=0; i < 5, i++){
        response.list[i].dt_txt
        };
    });
};

renderBtns();   