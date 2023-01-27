const searchButton = document.querySelector("#search-button");
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
        axios.get(queryURL).then(function (response) {
            const cityName = "the weather in " + response.data.city.name + "" + response.data.city.country + " is: ";
            const description = response.data.list[0].weather[0].description + " ";
            const windSpeed = "with a windspeed of " + response.data.list[0].wind.speed + " mph ";
            const date = "the local time is " + response.data.list[0].dt_txt;
            const icon = response.data.list[0].weather[0].icon;
            const temp = "the temperature is " + ((response.data.list[0].main.temp - 273.15).toFixed(1)) + " centigrade";
            const humidity = "the humidity is: " + response.data.list[0].main.humidity;
            const weatherResult = cityName + description + windSpeed + date + icon + temp + humidity;
            console.log(weatherResult);

            searchHistory();

            function searchHistory() {
                var history = JSON.parse(localStorage.getItem("history")) || [];
                localStorage.setItem("history", JSON.stringify(history));
                localStorage.setItem("history", JSON.stringify(history));
                var historySection = document.getElementById("history");
                history.forEach(function (place) {
                    var button = document.createElement("button");
                    button.className = "searchHistory";
                    button.innerHTML = place;
                    historySection.appendChild(button);
                });
                const placeHistoryButtons = document.querySelectorAll(".searchHistory");
                // placeHistoryButtons.forEach(function (button) {
                //     button.addEventListener("click", function () {
                //         // your event listener code here
                //     });
                // });

            }
        });
    });
});
