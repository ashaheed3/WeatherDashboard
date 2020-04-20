var citySearch = $("#newCity");
var searchBtn = $("#button-addon2");
var cityList = $(".city-list");
var cities = [];
var storedCities = JSON.parse(localStorage.getItem("cities"));

if (storedCities !== null) {
    cities = storedCities;
}


searchBtn.on("click", function(){

    var city = citySearch.val().trim();

    if (-1 == cities.indexOf(city)){
        cities.push(city);
    }

    
    getTodayWeather(city);
    get5DayWeather(city);

})

function getTodayWeather(city){
    
}
function get5DayWeather(city){
    var apiKey = "441eb15bfed2f8081dd8214ab58fbd5d"
    var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=london&appid=${apiKey}`;
          
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){ 

        console.log(response)
        

    });

}
    