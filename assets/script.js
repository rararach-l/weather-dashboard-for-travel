const searchButton = document.querySelector("#search-button");
const input = document.querySelector("#search-input");
const apiKey = "fd607638c6f3eabf1629f69a02128177";



searchButton.addEventListener("click", function (event) {
   event.preventDefault();
   const placeName = input.value;
   console.log("button was clicked")
   console.log (placeName);
   const queryGeocoded = "http://api.openweathermap.org/geo/1.0/direct?q=" + placeName + "&limit=5&appid=" + apiKey;
   axios.get(queryGeocoded).then(function(geoResponse) {
    console.log(geoResponse);
    var placeLat = geoResponse.data[0].lat
    var placeLong = geoResponse.data[0].lon
    console.log(placeLat, placeLong);
    const queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + placeLat + "&lon=" + placeLong + "&appid=" + apiKey;
    axios.get(queryURL).then(function(response) {
        console.log(response);
        const cityName = "the weather in " + response.data.city.name + response.data.city.country + " is: ";
        const windSpeed = "the wind speed is " + response.data.list[0].wind.speed + " mph";
        const date = "the local time is " + response.data.list[0].dt_txt
        const icon = response.data.list[0].weather[0].icon;
        const description = "the weather is " + response.data.list[0].weather[0].description;
        const temp = "the temperature is " + ((response.data.list[0].main.temp - 273.15).toFixed(1)) + " centigrade";
        const humidity = "the humidity is: " + response.data.list[0].main.humidity
        console.log(cityName, windSpeed, date, icon, description, temp, humidity)
  });
   })
 });
    // when results are returned 
    // 1. display them in the sections with the id "today" and "forecast"
    // 2. commit the search to local storage and display as a button in the section id "history"