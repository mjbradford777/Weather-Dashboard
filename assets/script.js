$(document).ready(function() {
    let queryURL = 'api.openweathermap.org/data/2.5/weather?q=';
    let APIkey = '&APPID=83b81619b1ba1aed2a20cc81447476e3';
    let city;

    $('#search').on('click', function() {
        event.preventDefault();
        city = $('#input').val().trim();
        console.log(city);
        // $.ajax({
        //     url: queryURL + city + APIkey,
        //     method: 'GET'
        // }).then(
        //     function(response) {
        //         console.log(response);
        //     }
        // )

        $.ajax({
            url: 'api.openweathermap.org/data/2.5/weather?q=London&APPID=83b81619b1ba1aed2a20cc81447476e3',
            method: 'GET'
        }).then(
            function(response) {
                console.log(response);
            }
        )
    })
})