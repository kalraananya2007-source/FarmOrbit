//testing commit
import React from "react";
import "./weather.css";

// Weather data
const weatherData = {
    location: "Patiala, Punjab",
    temperature: 31,
    condition: "Partly Cloudy",
    humidity: 68,
    windSpeed: 14,
    rainChance: 30,
    forecast: [
        { day: "Thursday", temp: 32 },
        { day: "Friday", temp: 29 },
        { day: "Saturday", temp: 28 },
        { day: "Sunday", temp: 31 }
    ]
};

// Component for current weather information
function WeatherCard({
    location,
    temperature,
    condition,
    humidity,
    windSpeed,
    rainChance
}) {
    return (
        <div className="weather-card">

            <h2>{location}</h2>

            <div className="weather-main">
                <span className="temperature">
                    {temperature}°C
                </span>

                <span className="condition">
                    {condition}
                </span>
            </div>

            <div className="weather-details">
                <p>Humidity: {humidity}%</p>
                <p>Wind: {windSpeed} km/h</p>
                <p>Rain Chance: {rainChance}%</p>
            </div>

        </div>
    );
}

// Component for individual forecast card
function ForecastCard({ day, temp }) {
    return (
        <div className="forecast-card">

            <p className="forecast-day">
                {day}
            </p>

            <p className="forecast-temp">
                {temp}°C
            </p>

        </div>
    );
}

// Main Weather component
function Weather() {
    return (
        <div className="weather-page">

            <h1>Weather</h1>

            <WeatherCard
                location={weatherData.location}
                temperature={weatherData.temperature}
                condition={weatherData.condition}
                humidity={weatherData.humidity}
                windSpeed={weatherData.windSpeed}
                rainChance={weatherData.rainChance}
            />

            <h3>Forecast</h3>

            <div className="forecast-list">

                {weatherData.forecast.map((item) => (
                    <ForecastCard
                        key={item.day}
                        day={item.day}
                        temp={item.temp}
                    />
                ))}

            </div>

        </div>
    );
}
export default Weather;