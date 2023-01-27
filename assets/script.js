const searchButton = document.querySelector(".search-button");
const input = document.querySelector("#search-input");
const apiKey = "fd607638c6f3eabf1629f69a02128177";

searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    const placeName = input.value;
    const queryGeocoded = "http://api.openweathermap.org/geo/1.0/direct?q=" + placeName + "&limit=5&appid=" + apiKey;
    axios.get(queryGeocoded).then(function (geoResponse) {
        var placeLat = geoResponse.data[0].lat
        var placeLong = geoResponse.data[0].lon
        const queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + placeLat + "&lon=" + placeLong + "&appid=" + apiKey;

        // check if the response is valid and alert to the user 
        // add feature for country search?
        axios.get(queryURL).then(function (response) {
            // getting the data only (without time) using moment.js to convert unix
            const timestamp = response.data.list[0].dt;
            const dateConverted = moment.unix(timestamp).format("dddd, MMMM Do YYYY");

            //adding the location information, with city and country
            const locationDate = "the weather in " + response.data.city.name + ", " + response.data.city.country + " on " + dateConverted + " is:" ;

            // description of the weather
            const description = response.data.list[0].weather[0].description + " ";

            // windspeed
            const windSpeed = "with a windspeed of " + response.data.list[0].wind.speed + " mph ";

            // the icon for the current weather
            const icon = "http://openweathermap.org/img/w/" + response.data.list[0].weather[0].icon + ".png";

            // the temperature
            const temp = "the temperature is " + ((response.data.list[0].main.temp - 273.15).toFixed(1)) + " centigrade";

            // the humidity
            const humidity = "with humidity of " + response.data.list[0].main.humidity;

            //console logging the whole report to check
            const weatherResult = locationDate + description + windSpeed + icon + temp + humidity;

            console.log(weatherResult);
            document.querySelector('.locationDate').innerHTML = locationDate;
            document.querySelector('.description').innerHTML = description;
            document.querySelector('.windSpeed').innerHTML = windSpeed;
            document.querySelector('.humidity').innerHTML = humidity;
            document.querySelector('.icon').src = icon;



            searchHistory();

            function searchHistory() {
                var history = JSON.parse(localStorage.getItem("history")) || [];
                var historySection = document.getElementById("history");
                history.forEach(function (place) {
                    var button = document.createElement("button");
                    button.className = "search-button";
                    button.innerHTML = place;
                    historySection.appendChild(button);
                });
            }
        });
    });
});

// store the search as a key with the name London