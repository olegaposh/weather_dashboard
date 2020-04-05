$(document).ready(function () {

    function citySearch (city) {
    //api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
    
    let key = "bf81dc4410bae4c75c0172966d86af60";
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {
        console.log(data)
        // pulled content into p elements
        let currentTemp = $("<p>").text("Temperature: " + data.main.temp + " F");
        let currentHumid = $("<p>").text("Humidity: " + data.main.humidity+ "%");
        let currentWindSpeed = $("<p>").text("Wind Speed: " + data.wind.speed +" MPH");
        $("#current").empty();
        $("#current").append(currentTemp,currentHumid, currentWindSpeed);
    });
};

    $(".btn-primary").on("click", function(event) {

        event.preventDefault();

        let city = $("#userInput").val();

        citySearch(city);
    });


});