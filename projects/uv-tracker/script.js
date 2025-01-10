// OpenWeatherMap API key
const apiKey = 'a174918a1b5e458065fe953f8fa0c1d1';

// Event listener to fetch city suggestions as the user types
document.getElementById('city').addEventListener('input', function () {
    const query = this.value;

    if (query.length >= 3) { // Start suggesting after 3 characters
        fetchLocationSuggestions(query);
    } else {
        clearSuggestions(); // Clear suggestions when query is too short
    }
});

// Function to fetch location suggestions
function fetchLocationSuggestions(query) {
    const geocodingUrl = `https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${apiKey}`;

    fetch(geocodingUrl)
        .then(response => response.json())
        .then(data => {
            const suggestionsList = document.getElementById('suggestions');
            suggestionsList.innerHTML = ''; // Clear previous suggestions

            if (data.list) {
                data.list.forEach(location => {
                    const option = document.createElement('option');
                    option.value = location.name + ', ' + location.sys.country; // Show city and country
                    suggestionsList.appendChild(option);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching location suggestions:', error);
        });
}

// Function to clear suggestions
function clearSuggestions() {
    const suggestionsList = document.getElementById('suggestions');
    suggestionsList.innerHTML = '';
}

// Function to get weather when a location is selected
function getWeather() {
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);

            const lat = data.coord.lat;
            const lon = data.coord.lon;

            // After displaying weather data, fetch the UV index using latitude and longitude
            const uvIndexUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            fetch(uvIndexUrl)
                .then(response => response.json())
                .then(uvData => {
                    const uvIndexElement = document.getElementById('uv-index');
                    uvIndexElement.textContent = `UV Index: ${uvData.value}`;
                })
                .catch(error => {
                    console.error('Error fetching UV index data:', error);
                    alert('Error fetching UV index data. Please try again.');
                });
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Optional: Display hourly forecast if needed
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

// Function to display weather data
function displayWeather(data) {
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `${data.wind.speed} m/s`;

    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherIcon.alt = data.weather[0];
}
