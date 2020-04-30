var citySearch = $("#newCity");
var searchBtn = $("#button-addon2");
var cityList = $(".city-list");
var cities = [];
var storedCities = JSON.parse(localStorage.getItem("cities"));

if (storedCities !== null) {
    cities = storedCities;
}

var apiKey = "441eb15bfed2f8081dd8214ab58fbd5d";

function getTodayWeather(city){

   
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    var today = moment().format("(MM/" + "DD/" + "YY)");
          
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){ 
  
        var icon = response.weather[0].icon;
        $(".city-date").text(`${response.name} ${today}`);
        $(".city-date").append(`<img src = " http://openweathermap.org/img/wn/${icon}@2x.png" alt = "weather icon"></img>`)
        $(".temp").text(`Temperature: ${response.main.temp}°F`);
        $(".humidity").text(`Humidity: ${response.main.humidity}%`);
        $(".wspeed").text(`Wind Speed: ${response.wind.speed} MPH`);

        getUVIndex(response.coord.lat, response.coord.lon);
        get5DayWeather(response.coord.lat, response.coord.lon);
        

    });
    
}

function getUVIndex(lat,lon){

    var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){ 

        console.log(response)
        $(".uvIndex").text(`UV Index: ${response.current.uvi}`);


    });
    
}

function get5DayWeather(lat,lon){


    var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){ 

        for (var i = 0; i < 5; i++){

            var forcast = $(`#day${i}`);
            var day = moment().add((i+1),'days').format("MM/" + "DD/" + "YY");
            var date = $(`<h5 class="card-title">${day}</h5>`);
            var icon = $(`<img src = " http://openweathermap.org/img/wn/${response.daily[i].weather[0].icon}.png" alt = "weather icon"></img>`);
            var temp = $(`<p class="card-text">Temp: ${response.daily[i].temp.day}°F</p>`);
            var humidity = $(`<p class="card-text">Humidity: ${response.daily[i].humidity}%</p>`)
            
            
            forcast.append(date);
            forcast.append(icon);
            forcast.append(temp);
            forcast.append(humidity);
        }

    });

}

function get5DayWeather(lat,lon){


    var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){ 

        for (var i = 0; i < 5; i++){

            var forcast = $(`#day${i}`);
            var day = moment().add((i+1),'days').format("MM/" + "DD/" + "YY");
            var date = $(`<h5 class="card-title">${day}</h5>`);
            var icon = $(`<img src = " http://openweathermap.org/img/wn/${response.daily[i].weather[0].icon}.png" alt = "weather icon"></img>`);
            var temp = $(`<p class="card-text">Temp: ${response.daily[i].temp.day}°F</p>`);
            var humidity = $(`<p class="card-text">Humidity: ${response.daily[i].humidity}%</p>`)
            
            
            forcast.append(date);
            forcast.append(icon);
            forcast.append(temp);
            forcast.append(humidity);
        }

    });

}

function renderCityButtons(){

    cities.forEach(element => {
        if (element != ""){
        cityBtn = $(`<button type="button" class="btn btn-light city">${element}</button>`)
        cityList.append(cityBtn);
        }
        
    });
}

renderCityButtons();

searchBtn.on("click", function(){

    var city = citySearch.val().trim();

    if (-1 == cities.indexOf(city)){
        cities.push(city);
        localStorage.setItem("cities",JSON.stringify(cities))
    }

    
    getTodayWeather(city);
    
});

$(".city").on("click",function(){
    var city = $(this).text();
    getTodayWeather(city);
})







    
