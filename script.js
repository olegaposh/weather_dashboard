$(document).ready(function () {

    let historyArray = [];
    retrieveHistory();

    function citySearch(city) {
        //api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
        //This grabs the city that was clicked by grabbing the data-name value 
        city = $(this).attr("data-name");
        let key = "bf81dc4410bae4c75c0172966d86af60";
        // This URL grabs the current weather
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key;
        //This URL grabs the 5 day forecast 
        let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + key;


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (data) {
            //console.log(data)
            // pulled current weather into p elements
            let currentTemp = $("<p>").text("Temperature: " + data.main.temp + " F");
            let currentHumid = $("<p>").text("Humidity: " + data.main.humidity + "%");
            let currentWindSpeed = $("<p>").text("Wind Speed: " + data.wind.speed + " MPH");
            let icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
            icon.attr("style", "max-width: 70px");
            $("#current").empty();
            $("#current").append(currentTemp, currentHumid, currentWindSpeed, icon);

            // Grab coordinates 
            let lati = data.coord.lat;
            let long = data.coord.lon;
            
            // This API pulls coordinates and will return the UV index 
            $.ajax({
                url:"https://api.openweathermap.org/data/2.5/onecall?lat="+lati+"&"+"lon="+long+"&appid="+key,
                method: "GET"
            }).then(function(data) {
                //console.log(data);
                currentUV = $("<p>").text("UV Index: " + data.current.uvi);
                //Display UV index 
                $("#current").append(currentUV);
            });

        });

        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function (data) {


            //console.log(data);
            for (let i = 5, j = 0; i < 40; i += 8, j++) {
                let classes = [".one", ".two", ".three", ".four", ".five"];
                let myDate = new Date(data.list[i].dt * 1000);
                let dateString = (myDate.getMonth() + 1) + "/" + (myDate.getDate()) + "/" + myDate.getFullYear();

                let temp = $("<p>").text(data.list[i].main.temp + "° F");
                let date = $("<p>").text(dateString);
                let humid = $("<p>").text("Humidity: " + data.list[i].main.humidity + "%");

                $(classes[j]).empty();
                $(classes[j]).append(temp, date, humid);


            }

        });

    };



    $(".btn-primary").on("click", function (event) {

        event.preventDefault();

        let inputText = $("#userInput").val()
        let city = inputText;
        // return from function if submitted blank
        if (city === "") {
            return;
        }

        historyArray.push(city);
        citySearch(city);
        inputText = "";

        storeHistory();
        renderHistory();
    });

    function renderHistory() {

        $("#history").innerHTML = "";

        //render a new li for each array
        for (let i = 0; i < historyArray.length; i++) {
            //store value of array
            let history = historyArray[i];
            
            let li = $("<li>");
            // add input to the li
            li.text(history);
            //adding class called clickable
            li.addClass("clickable");
            // adding a data attribute
            li.attr("data-name", historyArray[i]);
            //place the li into the ul 
            $("#history").append(li);
        }


    };

    function storeHistory() {
        // store the history of cities into an array
        localStorage.setItem("cities", JSON.stringify(historyArray));
    };

    function retrieveHistory() {


        let storedCities = JSON.parse(localStorage.getItem("cities"));
        if (storedCities !== null) {
            // If m retrieved, replace with the new array
            historyArray = storedCities;
        }

        renderHistory();
    };

    // Adding a click event listener to all elements with a class of "clickable"
    $(document).on("click", ".clickable", citySearch);


});