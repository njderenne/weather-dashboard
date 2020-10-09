
var key = "0d3be2c12e825847337b43e487a13afe";
var city = "Green Bay";


var getTodaysWeather = function() {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    console.log("Your are looking at weather for " + data.name);
                    console.log("This needs to display the time!!!");
                    console.log("The weather icon code is " + data.weather[0].icon);
                    console.log("Current Temp is " + data.main.temp +"F");
                    console.log("The humidity is " + data.main.humidity + "%");
                    console.log("The current wind speed is " + data.wind.speed + "mph");
                    console.log("This needs to display the current UV index");
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    fetch("http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + key)
                        .then(function(response) {
                            response.json().then(function(data) {
                                console.log(data);
                                console.log("The UV index is " + data.value);
                                if (data.value <= 2) {
                                    console.log("favorable")
                                } if (data.value > 2 && data.value < 8) {
                                    console.log("moderate");
                                } if (data.value >= 8) {
                                    console.log("severe");
                                }
                            });
                        });
                });
            };
        }); 
};

var getFutureWeather = function() {
    
}