$(document).ready(function() {
    let cityQueryURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
    let uvQueryURL = 'http://api.openweathermap.org/data/2.5/uvi?appid=83b81619b1ba1aed2a20cc81447476e3&lat=';
    let forecastQueryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    let APIkey = '&appid=83b81619b1ba1aed2a20cc81447476e3';
    let city;
    let longitude;
    let latitude;
    let code;
    let icon;
    let paragraph;

    $('#search').on('click', function() {
        event.preventDefault();
        city = $('#input').val().trim();
        console.log(city);
        $.ajax({
            url: cityQueryURL + city + '&units=imperial' + APIkey,
            method: 'GET'
        }).then(
            function(response) {
                console.log(response);
                $('#city-name').text(`${response.name} ${moment().format('MMMM Do YYYY')}`);
                icon = $('<img>').attr('src', `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`)
                $('#top').append(icon);
                paragraph = $('<p>').text(`Temperature: ${response.main.temp} &deg F`);
                $('#top').append(paragraph);
                paragraph = $('<p>').text(`Humidity: ${response.main.humidity} %`);
                $('#top').append(paragraph);
                paragraph = $('<p>').text(`Wind Speed: ${response.wind.speed} MPH`);
                $('#top').append(paragraph);
                longitude = response.coord.lon;
                latitude = response.coord.lat;
                code = response.sys.country;
                $.ajax({
                    url: uvQueryURL + latitude + '&lon=' + longitude,
                    method: 'GET'
                }).then(
                    function(response) {
                        console.log(response);
                        paragraph = $('<p>').text(`UV Index: ${response.value}`);
                        $('#top').append(paragraph);
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
            }
        );
    })
})