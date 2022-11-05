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

        // Run check to ensure City & Country fields have values
        if (searchCity == "" || searchCountry == "") {
            alert("City & Country are required. Try again!");
            return;
        }

        console.log(searchCity);
        console.log(searchState);
        console.log(searchCountry);

        // Run fetch and wait for response JSON
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "," + searchState + "," + searchCountry + "&units=imperial&APPID=9857d669989b2a7df63d0e3be6b22bb8", { mode: "cors"});
        const currentData = await response.json();
        console.log("Fetching current weather data from API...", currentData);

        // Construct Object for weather app from API JSON data
        const currentWeather: currentData.weather[0].main,
        place: currentData.name + ", " + searchState.toUpperCase() + " " + currentData.sys.country,
        temp: Math.round(currentData.main.temp),
        humidity: currentData.main.humidity + "%",
        wind: Math.round(currentData.wind.speed) + " MPH"
    };

    console.log(currentWeather);

    displayWeather(currentWeather);

    getGiphy(currentWeather.mainWeather);

} catch (err) {
    console.log("Something went wrong while fetching the current weather data...", err);
    alert("Something went wrong while fetching the current weather data...");
}

function clearSearch() {
    document.getElementById("search-city").value = "";
    document.getElementById("search-state").value = "";
    document.getElementById("search-country").value = "";
    const img = document.querySelector("img");
    img.style.display = "none";
    clearDOM();
}

// Function to display reset JSON to DOM
function displayWeather(currentWeather) {
    const displayDiv = document.querySelector(".display-div");

    // Call function to clear any DOM elements from previous searches
    clearDOM();

    // Create DOM elements
    const city = document.createElement("p");
    city.textContent = currentWeather.place;
    displayDiv.appendChild(city);
    const status = document.createElement("p");
    status.textContent = currentWeather.mainWeather;
    displayDiv.appendChild(status);
    const cityTemp = document.createElement("p");
    cityTemp.textContent = currentWeather.temp + " Degrees";
    displayDiv.appendChild(cityTemp);
    const cityHumidity = document.createElement("p");
    cityHumidity.textContent = currentWeather.humidity + " Humidity";
    displayDiv.appendChild(cityHumidity);
    const cityWind = document.createElement("p");
    cityWind.textContent = currentWeather.wind + " Wind";
    displayDiv.appendChild(cityWind);
}

async function getGiphy(mainWeather) {
    try {
        const img = document.querySelector("img");
        let keyWord = mainWeather;
        if (keyWord == "Clear") {
            keyWord = "Clear Sky";
        }
        const response = await fetch("https://api.giphy.com/v1/gifs/translate?api_key=W9virN3WbbA6c0IxIVJfdtEFJVuXRCmT&weirdness=0&s=" + keyWord, { mode: "cors" });
        const giphyResponse = await response.json();
        console.log(giphyResponse);
        img.style.display = "";
        img.src = giphyResponse.data.images.original.url;
    } catch (err) {
        console.log("An error occurred while trying to fetch the giphy...", err);
    }
}

function clearDOM() {
    // Clear DOM from previous searches 
    const nodeList = document.querySelectorAll("p");
    if (nodeList !== null) {
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].remove();
        }
    }
}