const input = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherCard = document.getElementById("weather-card");
const message = document.getElementById("message-container");
const historyBox = document.getElementById("history-container");

searchBtn.addEventListener("click", function() {
    if (input.value !== "") {
        getWeather(input.value);
    }
});

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter" && input.value !== "") {
        getWeather(input.value);
    }
});

async function getWeather(city) {
    try {
        message.textContent = "Loading...";
        weatherCard.classList.add("hidden");

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        message.textContent = "";
        showData(data);
        saveSearch(city);

    } catch (error) {
        if (navigator.onLine === false) {
            message.textContent = "No internet connection.";
        } else {
            message.textContent = "Unknown city, please try again.";
        }
        weatherCard.classList.add("hidden");
    }
}

function showData(data) {
    document.getElementById("city-name").textContent = data.name;
    document.getElementById("temperature").textContent = Math.round(data.main.temp) + "°C";
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("feels-like").textContent = Math.round(data.main.feels_like) + "°C";
    document.getElementById("humidity").textContent = data.main.humidity + "%";
    document.getElementById("wind").textContent = data.wind.speed + " m/s";
    document.getElementById("pressure").textContent = data.main.pressure + " hPa";
    
    let icon = data.weather[0].icon;
    document.getElementById("weather-icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

    weatherCard.classList.remove("hidden");
}

function saveSearch(city) {
    let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    history = history.filter(item => item.toLowerCase() !== city.toLowerCase());
    history.unshift(city);
    
    if (history.length > 5) {
        history.pop();
    }
    
    localStorage.setItem("weatherHistory", JSON.stringify(history));
    showHistory();
}

function showHistory() {
    historyBox.innerHTML = "";
    let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    
    for (let i = 0; i < history.length; i++) {
        let btn = document.createElement("button");
        btn.textContent = history[i];
        btn.className = "history-btn";
        
        btn.addEventListener("click", function() {
            input.value = history[i];
            getWeather(history[i]);
        });
        
        historyBox.appendChild(btn);
    }
}

showHistory();