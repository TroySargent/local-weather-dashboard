let cityList = [];

function renderBtns(){
    $("#cityBtns").empty();
    cityList = JSON.parse(localStorage.getItem("cityList"));
    if (cityList == null){
        cityList = [];
    };
    for (var i=0; i < cityList.length; i++){
        let city = cityList[i];
        $(`<button type="button" class="btn btn-outline-secondary my-1 btn-block" data-name="${city}">${city}</button>`).appendTo("#cityBtns");
    };
};

$("#citySearch").on("submit", function (event) {
    event.preventDefault(); 
    let cityInput = $("#cityInput").val();
    if (cityInput === "") {
        return;
    }
    cityList.push(cityInput);
    localStorage.setItem("cityList", JSON.stringify(cityList));

    renderBtns();
});

renderBtns();   
