let apiKey = "3a2865bfdde9a3d0404b80605b03f65a";
let cityList = [];

function renderBtns(){
    cityList = JSON.parse(localStorage.getItem("cityList"));
    $("#cityBtns").empty();
    if (cityList == null){
        cityList = [];
        $(`<h2 class="card-title">Please enter a city to get the weather.</h2>`).appendTo("#currentWeather")
        return;
    };
    for (var i=0; i < cityList.length; i++){
        let city = cityList[i];
        $(`<button type="button" class="btn btn-outline-secondary my-1 btn-block" data-name="${city}">${city}</button>`).prependTo("#cityBtns");
    };
};

function resetPage(){
    $("#currentWeather").empty();
    $("#forecast").empty(); 
};

$("#clearBtn").on("click", function () {
    localStorage.clear();
    resetPage();
    $("#forecastHeader").addClass("d-none");
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
    resetPage();
    getCurrentWeather(cityInput);
});

$("#cityBtns").on("click", ".btn", function () {
    let cityInput = $(this).attr("data-name");
    resetPage();
    getCurrentWeather(cityInput);
});

function getCurrentWeather(cityInput){
    let queryUrlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=${apiKey}`;
    
    $.ajax({
        url: queryUrlWeather,
        method: "GET",
    }).then(function (response) {
        let currentDateTime = new Date(response.dt * 1000).toLocaleString("en-US");
        
        $(`<h2>${cityInput} (${currentDateTime})</h2>
        <img src="http://openweathermap.org/img/w/${response.weather[0].icon}.png" alt="weather icon">
        <p class="card-text">Temperature: ${response.main.temp} °F</p>
        <p class="card-text">Humidity: ${response.main.humidity} %</p>
        <p class="card-text">Wind Speed: ${response.wind.speed} mph</p>`).appendTo(("#currentWeather"));
        $("#forecastHeader").removeClass("d-none")

        let lat = parseInt(response.coord.lat);
        let lon = parseInt(response.coord.lon);
        getForecast(lat, lon)
    });
};

function getUVIndex(response) {
    UVIndex = response.current.uvi;
    $(`<p class="card-text">UV Index: <span id="UVIndex" class="rounded p-2">${UVIndex}</span></p>`).appendTo(("#currentWeather"));
    switch (true){
        case (UVIndex < 5):
            $("#UVIndex").addClass("bg-success");
            break;
        case (UVIndex < 8):
            $("#UVIndex").addClass("bg-warning");
            break;
        case (UVIndex > 8):
            $("#UVIndex").addClass("bg-danger");
            break;
    };
};

function getForecast(lat, lon) {
    let queryUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    
    $.ajax({
        url: queryUrlForecast,
        method: "GET",
    }).then(function (response) {
        //skip current day in for loop, start at 1th indec
        for (var i=1; i < 6; i++) {
            let date = new Date(response.daily[i].dt * 1000).toLocaleDateString("en-US");
            
            $(`<div class="col-xl-2 col-12 mb-2">
            <div class="card text-white bg-primary">
            <div class="card-body">
            <h5 class="card-title">${date}</h5>
            <img src="http://openweathermap.org/img/w/${response.current.weather[0].icon}.png" alt="weather icon">
            <p class="card-text">Temp (high): ${response.daily[i].temp.max} °F</p>
            <p class="card-text">Temp (low): ${response.daily[i].temp.min} °F</p>
            <p class="card-text">Humidity: ${response.daily[i].humidity} %</p>
            </div>
            </div>
            </div>`).appendTo("#forecast");
        };
        
        //pass response to get UV index
        getUVIndex(response);
    });
};

$(document).ready(function(){
    if (cityList !== null){
    getCurrentWeather(cityList[cityList.length-1]);//get latest city on refresh
    }
});

renderBtns();   