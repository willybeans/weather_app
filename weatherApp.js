let weatherData = [];
let userLongitude = "";
let userLatitude = "";
let counter = 0;

function getWeather(lat, lon) {
    let urlLocation = "https://fcc-weather-api.glitch.me/api/current?"
    $.ajax({
        dataType: "json",
        url: urlLocation + "lat=" + lat + "&lon=" + lon,
        success: function(data) {
            let city = data.name;
            let country = data.sys.country;
            let temp = data.main.temp;
            let weather = data.weather["0"].description;
            let weatherIcon = data.weather["0"].icon;

            $(".userCity").html(city + "," + country);
            $(".temp").html(temp + "°" + "C");
            $(".temp").on('click', function() {
                let tempf = (temp * 1.8) + 32;
                tempf = Math.floor(tempf);
                if (counter === 0) {
                    $(".temp").html(tempf + "°" + "F");
                    counter++;
                } else if (counter === 1) {
                    $(".temp").html(temp + "°" + "C");
                    counter--;
                }
            });
            $(".temp").mouseover(function() {
                    $(".temp").css('color', 'blue');
                })
                .mouseout(function() {
                    $(".temp").css('color', 'white');
                });
            $(".weather").html(weather);
            $('#weather_Icon').attr('src', weatherIcon);

            console.log(data);
        },
        error: function(xhr, status, error) {
            console.log("error");
        },
        cache: false //this is important
    });
}

$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            let crd = pos.coords;
            userLatitude = crd.latitude;
            userLongitude = crd.longitude;
            getWeather(userLatitude, userLongitude);
        });
    } else {
        $(".userCity").html("This app does not support mobile *sadface*");
        console.log("Geolocation is not supported by this browser.");
    }
});
