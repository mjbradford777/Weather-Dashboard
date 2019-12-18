$(document).ready(function() {
    let cityQueryURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
    let uvQueryURL = 'http://api.openweathermap.org/data/2.5/uvi?appid=83b81619b1ba1aed2a20cc81447476e3&lat=';
    let forecastQueryURL = 'https://api.openweathermap.org/data/2.5/forecast?q={city name},{country code}';
    let APIkey = '&appid=83b81619b1ba1aed2a20cc81447476e3';
    let city;
    let longitude;
    let latitude;
    let code;

    $('#search').on('click', function() {
        event.preventDefault();
        city = $('#input').val().trim();
        console.log(city);
        $.ajax({
            url: cityQueryURL + city + APIkey,
            method: 'GET'
        }).then(
            function(response) {
                console.log(response);
                console.log(response.name);
                console.log(moment().format('MMMM Do YYYY'));
                console.log(response.main.temp);
                console.log(response.main.humidity);
                console.log(response.wind.speed);
                console.log(response.coord.lon);
                console.log(typeof(response.coord.lon));
                longitude = response.coord.lon;
                console.log(response.coord.lat);
                console.log(typeof(response.coord.lat));
                latitude = response.coord.lat;
                console.log(response.sys.country);
                console.log(typeof(response.sys.country));
                code = response.sys.country;
            }
        );

        $.ajax({
            url: uvQueryURL + latitude + '&lon=' + longitude,
            method: 'GET'
        }).then(
            function(response) {
                console.log(response);
            }
        );

        $.ajax({
            url: forecastQueryURL + city + ',' + code + APIkey,
            method: 'GET'
        }).then(
            function(response) {
                console.log(response);
            }
        );
    })
})