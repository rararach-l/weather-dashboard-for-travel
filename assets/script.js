const search = document.querySelector(".search-button");
const input = document.querySelector("#search-input");
const apiKey = "fd607638c6f3eabf1629f69a02128177";
const historySection = document.querySelector("#historySection");

search.addEventListener("click", function (event) {
    event.preventDefault();
    const placeName = input.value;
    // Check if search term has been entered before
    var history = [];
    if (history.indexOf(placeName) === -1) {
        console.log("Search term already exists in local storage");
    }
    else (history.indexOf(placeName) !== -1)
    // Save search term to local storage
    history.push(placeName);
    localStorage.setItem("searchHistory", JSON.stringify(history));
    function searchHistory() {
        history.forEach(function (place) {
            var button = document.createElement("button");
            button.className = "search-button";
            button.innerHTML = place;
            historySection.appendChild(button);
        });
    }

    const queryGeocoded = "https://api.openweathermap.org/geo/1.0/direct?q=" + placeName + "&limit=5&appid=" + apiKey;
    axios.get(queryGeocoded).then(function (geoResponse) {
        var placeLat = geoResponse.data[0].lat
        var placeLong = geoResponse.data[0].lon
        const queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + placeLat + "&lon=" + placeLong + "&appid=" + apiKey;
        // check if the response is valid and alert to the user 
        // add feature for country search?
        axios.get(queryURL).then(function (response) {
            const placeData = response.data;
            //const place = placeData[0];
            const weatherList = placeData.list;
            var j = 0;
            for (let i = 0; i < weatherList.length; i += 8) {
                const weather = weatherList[i];
                //console.log(weather);
                console.log(response)

                // getting the data only (without time) using moment.js to convert unix
                const timestamp = weatherList[i].dt;
                const dateConverted = moment.unix(timestamp).format("dddd, MMMM Do YYYY");

                //adding the location information, with city and country
                const locationDate = "the weather in " + response.data.city.name + ", " + response.data.city.country + " on " + dateConverted + " is:";
                console.log(locationDate)

                // description of the weather
                const description = weatherList[i].weather[0].description + " ";

                // windspeed
                const windSpeed = "with a windspeed of " + weatherList[i].wind.speed + " mph ";

                // the icon for the current weather
                const icon = "https://openweathermap.org/img/w/" + weatherList[i].weather[0].icon + ".png";

                // the temperature
                const temp = "the temperature is " + ((weatherList[i].main.temp - 273.15).toFixed(1)) + " centigrade";

                // the humidity
                const humidity = "with humidity of " + weatherList[i].main.humidity;

                //console logging the whole report to check
                //const weatherResult = locationDate + description + windSpeed + icon + temp + humidity;

                // console.log(weatherResult);
                if (j == 0) {
                    // document.querySelector('.locationDate').innerHTML = locationDate;
                    document.querySelector('#forecastAhead').innerHTML = "";
                    document.querySelector('.location').innerHTML = "The weather in " + placeName + " on " + dateConverted + " is "
                    document.querySelector('.description').innerHTML = description;
                    document.querySelector('.temp').innerHTML = temp;
                    document.querySelector('.windSpeed').innerHTML = windSpeed;
                    document.querySelector('.humidity').innerHTML = humidity;
                    document.querySelector('.icon').src = icon;
                } else {
                    const forecast = document.createElement("div");
                    forecast.classList.add("card", "col-md-2", "mb-3");
                    forecast.innerHTML = "<h5>" + dateConverted + "</h5>" + "<img class='icon' src='" + icon + "'>" + "<p class='card-text description'>" + description + "</p>" + "<p class='card-text windSpeed'>" + windSpeed + "</p>" + "<p class='card-text humidity'>" + humidity + "</p>";
                    document.querySelector('#forecastAhead').appendChild(forecast);

                }
                j++;
                if (j > 5) break;

                searchHistory();
            }
        });
    });
});