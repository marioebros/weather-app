// DOM Module Pattern 
const domManip = (() => {
    const searchButton = document.querySelector(".search-button");
    const clearButton = document.querySelector(".reset-button");
    searchButton.addEventListener("click", fetchCurrentWeather);
    clearButton.addEventListener("click", clearSearch);
    document.addEventListener("DOMContentLoaded", function hideBrokenImg() {
        let firstLoadImg = document.querySelector("img");
        firstLoadImg.style.display="none";
    });
})();

// Async function to fetch current forecast from user input on form
async function fetchCurrentWeather() {
    try {
        const searchCity = document.getElementById("search-city").value;
        const searchState = document.getElementById("search-state").value;
        const searchCountry = document.getElementById("search-country").value;
        console.log(searchCity);
        console.log(searchState);
        console.log(searchCountry);
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "," + searchState + "," + searchCountry + "&units=imperial&APPID=9857d669989b2a7df63d0e3be6b22bb8", { mode: "cors"});
        const 
    }
}