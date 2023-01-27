const searchButton = document.querySelector("#search-button");
const input = document.querySelector("#search-input");
const apiKey = "fd607638c6f3eabf1629f69a02128177";
// const queryURL = api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid= + apiKey



searchButton.addEventListener("click", function (event) {
   event.preventDefault();
   const place = input.value;
   console.log("button was clicked")
   console.log (place);
   const queryGeocoded = "http://api.openweathermap.org/geo/1.0/direct?q=" + place + "&limit=5&appid=" + apiKey;
    });

 // event listener on search button to call on the API for The city name, The date, An icon representation of weather conditions, The temperature, The humidity,The wind speed
    // include a function to convert the search into a latitude and longitude – use geocoding API
    // when results are returned 
    // 1. display them in the sections with the id "today" and "forecast"
    // 2. commit the search to local storage and display as a button in the section id "history"