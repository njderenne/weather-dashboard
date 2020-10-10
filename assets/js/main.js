
var inputEl = document.querySelector("#search");

var cityEl = document.querySelector(".city");
var currentTemp = document.querySelector(".current-temp");
var currentHumidity = document.querySelector(".current-humidity");
var currentWind = document.querySelector(".current-wind");
var currentUvIndex = document.querySelector(".current-uv-index");
var searchedCityEl = document.querySelector(".searched-city");
//var searchHistoryEl = document.querySelector(".search-history");

var submitBtnEl = document.querySelector(".btn");

var searchedArray = [];
var key = "0d3be2c12e825847337b43e487a13afe";

var formSubmitHandler = function(event) {
    event.preventDefault();
    //grabs the city input by the user
    var cityInput = inputEl.value.trim();

    if (cityInput) {
        getTodaysWeather(cityInput);
        inputEl.value = "";
    } else {
        alert("Please enter a city")
    }
};

var getTodaysWeather = function(city) {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    //console.log(data);
                    cityEl.textContent = "City: " + city;
                    console.log("This needs to display the date!!!");
                    console.log("The weather icon code is " + data.weather[0].icon);
                    currentTemp.textContent = "Temperature: " + data.main.temp +" F";
                    currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
                    currentWind.textContent = "Wind Speed: " + data.wind.speed + " mph";
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    fetch("http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + key)
                        .then(function(response) {
                            response.json().then(function(data) {
                                console.log(data);
                                console.log(data.date_iso);
                                currentUvIndex.textContent = "UV Index: " + data.value;
                                if (data.value <= 2) {
                                    currentUvIndex.classList = ("favorable");
                                } if (data.value > 2 && data.value < 8) {
                                    currentUvIndex.classList = ("moderate");
                                } if (data.value >= 8) {
                                    currentUvIndex.classList = ("severe");
                                }
                            });
                        });
                });
            };
        });
    cityHistory(city); 
};



var getFutureWeather = function() {
    fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + key)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    for (i = 3; i<data.list.length; i+=8) {
                        console.log("Day " + i/8);
                        console.log("Todays date is " + data.list[i].dt_txt);
                        console.log("Weather icon is " + data.list[i].weather[0].icon);
                        console.log("The high temperature is " + data.list[i].main.temp_max + "F");
                        console.log("The low temperature is " + data.list[i].main.temp_min + "F");
                        console.log("The humidity will be " + data.list[i].main.humidity + "%");
                        console.log("");
                    };
                });
            };
        });
};

var cityHistory = function(city) {
    if (searchedArray.length<8) {
        console.log("less than 8");
        searchedArray.push(city);
        console.log(searchedArray);
    } else {
        console.log("more than 8");
        searchedArray.shift();
        searchedArray.push(city);
    }
    for (i=0; i<searchedArray.length; i++) {
        //saving the searchedArray to local storage
        localStorage.setItem("searchedCity: "+ i, JSON.stringify(searchedArray[i]));
    }

    // var searchedListEl = document.createElement("ul");
    // searchHistoryEl.appendChild(searchedListEl);
    // for (i = 0; i < searchedArray.length; i++) {
    //     var searchedEl = document.createElement("li");
    //     searchedEl.classList = "recently-searched";
    //     console.log(searchedArray);
    //     searchedEl.textContent = searchedArray[i];
    //     console.log(searchedEl);
    //     searchedCityEl.appendChild(searchedEl);
    // }
}

var loadSearchHistory = function() {
    for (i=0; i<searchedArray.length; i++) {
        searchedCity = JSON.parse(localStorage.getItem("searchedCity: " + i));
        console.log(searchedCity);
    }
};


submitBtnEl.addEventListener("click", formSubmitHandler);