$(document).ready(function () {

    function citySearch(city) {
        //api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

        let key = "bf81dc4410bae4c75c0172966d86af60";
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key;
        let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + key;


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (data) {
            console.log(data)
            // pulled content into p elements
            let currentTemp = $("<p>").text("Temperature: " + data.main.temp + " F");
            let currentHumid = $("<p>").text("Humidity: " + data.main.humidity + "%");
            let currentWindSpeed = $("<p>").text("Wind Speed: " + data.wind.speed + " MPH");
            let icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon +"@2x.png"); 
            icon.attr("style", "max-width: 70px");
            $("#current").empty();
            $("#current").append(currentTemp, currentHumid, currentWindSpeed, icon);
            
        });

        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function (data) {

            
            console.log(data);
            for (let i = 5, j = 0; i < 40; i += 8, j++) {
                let classes = [".one", ".two", ".three", ".four", ".five"];
                let myDate = new Date(data.list[i].dt * 1000);
                let dateString = (myDate.getMonth() + 1) + "/" + (myDate.getDate()) + "/" + myDate.getFullYear();

                let temp = $("<p>").text(data.list[i].main.temp);
                let date = $("<p>").text(dateString);
                let humid = $("<p>").text("Humidity: " + data.list[i].main.humidity + "%");
                
                $(classes[j]).empty();
                $(classes[j]).append(temp, date, humid);


            }



        });

    };


    // function renderStufff() {

    //     // city, 
    //     // {
    //     //     cities: [city1, city2, city3]
    //     // }
    //     // myStringVal = localStorage.get("city");
    //     // cityObj = jSONParse(myStringVal)
    //     // myArray = cityObj.cities
        

    //     // Get city from localStorage

    //     // For each value in city.cities do stuff

        
    // }

    $(".btn-primary").on("click", function (event) {

        event.preventDefault();

        // Add $("#userInput").val() to local storage
        // Create a new html elment with $("#userInput").val()
        // add an event handler for the new element

        let city = $("#userInput").val();

        citySearch(city);
    });

    // render function
    // checks for city array in local storage
    // json.parse city array
    // for each city in array add a html element in history
    
    // For each of your history html elements add an event handler to run citySearch(city)


    

});