$(document).ready(function() {
    let cityQueryURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
    let uvQueryURL = 'http://api.openweathermap.org/data/2.5/uvi?appid=83b81619b1ba1aed2a20cc81447476e3&lat=';
    let forecastQueryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    let APIkey = '&appid=83b81619b1ba1aed2a20cc81447476e3';
    let element;
    let city;
    let longitude;
    let latitude;
    let code;
    let icon;
    let paragraph;
    let card;
    let cardBody;
    let bottomParagraph;
    let bottomIcon;
    let cities;
    let button;

    const init = () => {
        $('#top').empty();
        $('#bottom').empty();
        element = $('<h2>').attr('id', 'city-name');
        element.attr('class', 'display-4');
        $('#top').append(element);
        element = $('<h2>').attr('id', 'forecast');
        $('#bottom').append(element);
        city = JSON.parse(localStorage.getItem('currentCity'));
        if (city === null) {
            return;
        } else {
            $.ajax({
                url: cityQueryURL + city + '&units=imperial' + APIkey,
                method: 'GET'
            }).then(
                function(response) {
                    console.log(response);
                    $('#city-name').text(`${response.name} (${moment().format('MMMM Do YYYY')})`);
                    icon = $('<img>').attr('src', `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`)
                    $('#top').append(icon);
                    paragraph = $('<p>').text(`Temperature: ${response.main.temp} F`);
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
                        url: forecastQueryURL + city + ',' + code + '&units=imperial' + APIkey,
                        method: 'GET'
                    }).then(
                        function(response) {
                            console.log(response);
                            for (let i = 0; i < 5; i++) {
                                card = $('<div>').attr('class', 'card col-sm');
                                cardBody = $('<div>').attr('class', 'card-body');
                                bottomParagraph = $('<p>').text(moment().add((i + 1), 'days').calendar());
                                cardBody.append(bottomParagraph);
                                bottomIcon = $('<img>').attr('src', `http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png`);
                                bottomIcon.attr('class', 'bottom-image');
                                cardBody.append(bottomIcon);
                                bottomParagraph = $('<p>').text(`Temp: ${response.list[i].main.temp} F`);
                                cardBody.append(bottomParagraph);
                                bottomParagraph = $('<p>').text(`Humidity: ${response.list[i].main.humidity}%`);
                                cardBody.append(bottomParagraph);
                                card.append(cardBody);
                                $('#bottom').append(card);
                            }
                        }
                    );
                }
            );
        }
        cities = JSON.parse(localStorage.getItem('cityList'));
        if (cities === null) {
            return;
        } else {
            $('#buttons').empty();
            for (let i = 0; i < cities.length; i++) {
                button = $('<button>').text(cities[i]);
                button.attr('class', 'btn btn-success button-group');
                button.attr('id', cities[i]);
                $('#buttons').append(button);
            }
        }
    }

    $('#search').on('click', function() {
        event.preventDefault();
        $('#top').empty();
        $('#bottom').empty();
        element = $('<h2>').attr('id', 'city-name');
        element.attr('class', 'display-4');
        $('#top').append(element);
        element = $('<h2>').attr('id', 'forecast');
        $('#bottom').append(element);
        city = $('#input').val().trim();
        console.log(city);
        localStorage.setItem('currentCity', JSON.stringify(city));
        console.log(cities);
        $('#buttons').empty();
        if (cities === null || cities === undefined) {
            cities = [];
            cities.push(city);
            console.log(cities);
            localStorage.setItem('cityList', JSON.stringify(cities));
            for (let i = 0; i < cities.length; i++) {
                button = $('<button>').text(cities[i]);
                button.attr('class', 'btn btn-success button-group');
                button.attr('id', cities[i]);
                $('#buttons').append(button);
            }
        } else if (cities.length < 5) {
            cities.push(city);
            localStorage.setItem('cityList', JSON.stringify(cities));
            for (let i = 0; i < cities.length; i++) {
                button = $('<button>').text(cities[i]);
                button.attr('class', 'btn btn-success button-group');
                button.attr('id', cities[i]);
                $('#buttons').append(button);
            }
        } else {
            cities.shift();
            cities.push(city);
            localStorage.setItem('cityList', JSON.stringify(cities));
            for (let i = 0; i < cities.length; i++) {
                button = $('<button>').text(cities[i]);
                button.attr('class', 'btn btn-success button-group');
                button.attr('id', cities[i]);
                $('#buttons').append(button);
            }
        }

        $.ajax({
            url: cityQueryURL + city + '&units=imperial' + APIkey,
            method: 'GET'
        }).then(
            function(response) {
                console.log(response);
                $('#city-name').text(`${response.name} (${moment().format('MMMM Do YYYY')})`);
                icon = $('<img>').attr('src', `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`)
                $('#top').append(icon);
                paragraph = $('<p>').text(`Temperature: ${response.main.temp} F`);
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
                    url: forecastQueryURL + city + ',' + code + '&units=imperial' + APIkey,
                    method: 'GET'
                }).then(
                    function(response) {
                        console.log(response);
                        for (let i = 0; i < 5; i++) {
                            card = $('<div>').attr('class', 'card col-sm');
                            cardBody = $('<div>').attr('class', 'card-body');
                            bottomParagraph = $('<p>').text(moment().add((i + 1), 'days').calendar());
                            cardBody.append(bottomParagraph);
                            bottomIcon = $('<img>').attr('src', `http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png`);
                            bottomIcon.attr('class', 'bottom-image');
                            cardBody.append(bottomIcon);
                            bottomParagraph = $('<p>').text(`Temp: ${response.list[i].main.temp} F`);
                            cardBody.append(bottomParagraph);
                            bottomParagraph = $('<p>').text(`Humidity: ${response.list[i].main.humidity}%`);
                            cardBody.append(bottomParagraph);
                            card.append(cardBody);
                            $('#bottom').append(card);
                        }
                    }
                );
            }
        );
    });

    $('#buttons').on('click', '.button-group', function() {
        city = $(this)[0].id;
        console.log(city);
        $('#top').empty();
        $('#bottom').empty();
        element = $('<h2>').attr('id', 'city-name');
        element.attr('class', 'display-4');
        $('#top').append(element);
        element = $('<h2>').attr('id', 'forecast');
        $('#bottom').append(element);
        localStorage.setItem('currentCity', JSON.stringify(city));
        $.ajax({
            url: cityQueryURL + city + '&units=imperial' + APIkey,
            method: 'GET'
        }).then(
            function(response) {
                console.log(response);
                $('#city-name').text(`${response.name} (${moment().format('MMMM Do YYYY')})`);
                icon = $('<img>').attr('src', `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`)
                $('#top').append(icon);
                paragraph = $('<p>').text(`Temperature: ${response.main.temp} F`);
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
                    url: forecastQueryURL + city + ',' + code + '&units=imperial' + APIkey,
                    method: 'GET'
                }).then(
                    function(response) {
                        console.log(response);
                        for (let i = 0; i < 5; i++) {
                            card = $('<div>').attr('class', 'card col-sm');
                            cardBody = $('<div>').attr('class', 'card-body');
                            bottomParagraph = $('<p>').text(moment().add((i + 1), 'days').calendar());
                            cardBody.append(bottomParagraph);
                            bottomIcon = $('<img>').attr('src', `http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png`);
                            bottomIcon.attr('class', 'bottom-image');
                            cardBody.append(bottomIcon);
                            bottomParagraph = $('<p>').text(`Temp: ${response.list[i].main.temp} F`);
                            cardBody.append(bottomParagraph);
                            bottomParagraph = $('<p>').text(`Humidity: ${response.list[i].main.humidity}%`);
                            cardBody.append(bottomParagraph);
                            card.append(cardBody);
                            $('#bottom').append(card);
                        }
                    }
                );
            }
        );
    });

    init();
})