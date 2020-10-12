
var inputEl = document.querySelector("#search");

var cityEl = document.querySelector(".city");
var currentIcon = document.querySelector(".current-icon");
var currentTemp = document.querySelector(".current-temp");
var currentHumidity = document.querySelector(".current-humidity");
var currentWind = document.querySelector(".current-wind");
var currentUvIndex = document.querySelector(".current-uv-index");
var searchedCityEl = document.querySelector(".searched-city");
//var searchHistoryEl = document.querySelector(".search-history");

var recallSearchEl = document.querySelector(".recall-search");

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
                    console.log(data);
                    cityEl.textContent = "City: " + city;
                    //console.log("This needs to display the date!!!");
                    currentIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
                    //console.log("The weather icon code is " + data.weather[0].icon);
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
    getFutureWeather(city);
    cityHistory(city);
};



var getFutureWeather = function(city) {
    fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + key)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    j=1;
                    for (i = 3; i<data.list.length; i+=8) {
                        var futureDateEl = document.querySelector(".future-date-" + j);
                        var futureIconEl = "";
                        var futureTempEl = document.querySelector(".future-temp-" + j);
                        var futureHumidityEl = document.querySelector(".future-humidity-" + j);
                        splitDate = data.list[i].dt_txt;
                        futureDateEl.textContent = "Date: " + splitDate.split(" ")[0];
                        futureIconEl.textContent = "Icon: " + data.list[i].weather[0].icon;
                        futureTempEl.textContent = "Temp: " + data.list[i].main.temp + " F";
                        futureHumidityEl.textContent = "Humidity: " + data.list[i].main.humidity + "%";

                        j++;
                    };
                });
            };
        });
};

var cityHistory = function(city) {
    citySearch = document.createElement("button");
    citySearch.textContent = city;
    citySearch.classList = "btn recall-search";
    citySearch.setAttribute("value", city);
    //citySearch.setAttribute("href", );
    searchedCityEl.appendChild(citySearch);
    console.log(citySearch.value.trim());
    city = citySearch.value.trim();
};


submitBtnEl.addEventListener("click", formSubmitHandler);

