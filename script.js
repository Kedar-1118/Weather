document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "b74c6da389924a36b19f3ac4976c7100"; //env variables

    getWeatherBtn.addEventListener("click", async () => {
        const city = cityInput.value.trim();
        if (!city) return;


        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }

    })

    cityInput.addEventListener("keyup", async (e) => {
        if (e.key !== "Enter") {
            return;
        }
        const city = cityInput.value.trim();
        if (!city) return;

        // it may throw an error
        // server/database is always in another continent

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }
    });


    async function fetchWeatherData(city) {
        //gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(" City Not found");
        }
        const data = await response.json();
        return data;
    }

    function displayWeatherData(data) {
        // display
        console.log(data);
        const { name, main, weather, wind, sys } = data;
        cityNameDisplay.textContent = 'City : ' + name + ', ' + sys.country;
        temperatureDisplay.innerHTML = `Temperature : ${main.temp} <br>humidity: ${main.humidity} <br>wind-speed: ${wind.speed}`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    }

    function showError() {
        // display
        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }

});