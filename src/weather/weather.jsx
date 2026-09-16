import React, { useState } from "react";
import "./weather.css";
import { useLanguage } from "../Languagecontext";

const locationData = {
    Punjab: ["Patiala", "Amritsar", "Ludhiana", "Jalandhar"],
    Haryana: ["Hisar", "Karnal", "Rohtak", "Panipat"],
    Himachal_Pradesh: ["Shimla", "Manali", "Kangra", "Solan"],
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota"]
};

const weatherData = {
    Patiala: {
        temperature: 31, condition: "Partly Cloudy", humidity: 68, windSpeed: 14, rainChance: 30,
        forecast: [
            {day:"Yesterday", temp:29, condition:"Partly Cloudy"},
            {day:"Today", temp:31, condition:"Partly Cloudy"},
            {day:"Tomorrow", temp:32, condition:"Sunny"}
        ]
    },
    Amritsar: {
        temperature: 30, condition: "Sunny", humidity: 62, windSpeed: 12, rainChance: 20,
        forecast: [
            { day: "Yesterday", temp: 30, condition: "Sunny" },
            { day: "Today", temp: 32, condition: "Sunny" },
            { day: "Tomorrow", temp: 31, condition: "Partly Cloudy" }
        ]
    },
    Ludhiana: {
        temperature: 32, condition: "Cloudy", humidity: 70, windSpeed: 15, rainChance: 35,
        forecast: [
            { day: "Yesterday", temp: 30, condition: "Cloudy" },
            { day: "Today", temp: 32, condition: "Cloudy" },
            { day: "Tomorrow", temp: 33, condition: "Partly Cloudy" }
        ]
    },
    Jalandhar: {
        temperature: 31, condition: "Partly Cloudy", humidity: 67, windSpeed: 13, rainChance: 28,
        forecast: [
            { day: "Yesterday", temp: 33, condition: "Sunny" },
            { day: "Today", temp: 31, condition: "Partly Cloudy" },
            { day: "Tomorrow", temp: 32, condition: "Partly Cloudy" }
        ]
    },
    Hisar: {
        temperature: 34, condition: "Sunny", humidity: 50, windSpeed: 16, rainChance: 15,
        forecast: [
            { day: "Yesterday", temp: 32, condition: "Partly Cloudy" },
            { day: "Today", temp: 34, condition: "Sunny" },
            { day: "Tomorrow", temp: 35, condition: "Sunny" }
        ]
    },
    Karnal: {
        temperature: 32, condition: "Cloudy", humidity: 64, windSpeed: 14, rainChance: 30,
        forecast: [
            { day: "Yesterday", temp: 30, condition: "Cloudy" },
            { day: "Today", temp: 32, condition: "Cloudy" },
            { day: "Tomorrow", temp: 33, condition: "Partly Cloudy" }
        ]
    },
    Rohtak: {
        temperature: 33, condition: "Sunny", humidity: 55, windSpeed: 15, rainChance: 18,
        forecast: [
            { day: "Yesterday", temp: 31, condition: "Partly Cloudy" },
            { day: "Today", temp: 33, condition: "Sunny" },
            { day: "Tomorrow", temp: 34, condition: "Sunny" }
        ]
    },
    Panipat: {
        temperature: 32, condition: "Partly Cloudy", humidity: 60, windSpeed: 13, rainChance: 25,
        forecast: [
            { day: "Yesterday", temp: 30, condition: "Cloudy" },
            { day: "Today", temp: 32, condition: "Partly Cloudy" },
            { day: "Tomorrow", temp: 33, condition: "Sunny" }
        ]
    },
    Shimla: {
        temperature: 22, condition: "Cloudy", humidity: 72, windSpeed: 10, rainChance: 40,
        forecast: [
            { day: "Yesterday", temp: 24, condition: "Partly Cloudy" },
            { day: "Today", temp: 22, condition: "Cloudy" },
            { day: "Tomorrow", temp: 23, condition: "Cloudy" }
        ]
    },
    Manali: {
        temperature: 18, condition: "Partly Cloudy", humidity: 75, windSpeed: 9, rainChance: 45,
        forecast: [
            { day: "Yesterday", temp: 15, condition: "Cloudy" },
            { day: "Today", temp: 18, condition: "Partly Cloudy" },
            { day: "Tomorrow", temp: 19, condition: "Cloudy" }
        ]
    },
    Kangra: {
        temperature: 25, condition: "Cloudy", humidity: 70, windSpeed: 11, rainChance: 35,
        forecast: [
            { day: "Yesterday", temp: 23, condition: "Partly Cloudy" },
            { day: "Today", temp: 25, condition: "Cloudy" },
            { day: "Tomorrow", temp: 26, condition: "Partly Cloudy" }
        ]
    },
    Solan: {
        temperature: 24, condition: "Partly Cloudy", humidity: 65, windSpeed: 10, rainChance: 30,
        forecast: [
            { day: "Yesterday", temp: 22, condition: "Cloudy" },
            { day: "Today", temp: 24, condition: "Partly Cloudy" },
            { day: "Tomorrow", temp: 25, condition: "Sunny" }
        ]
    },
    Jaipur: {
        temperature: 35, condition: "Sunny", humidity: 45, windSpeed: 18, rainChance: 10,
        forecast: [
            { day: "Yesterday", temp: 33, condition: "Sunny" },
            { day: "Today", temp: 35, condition: "Sunny" },
            { day: "Tomorrow", temp: 36, condition: "Sunny" }
        ]
    },
    Jodhpur: {
        temperature: 37, condition: "Sunny", humidity: 38, windSpeed: 20, rainChance: 8,
        forecast: [
            { day: "Yesterday", temp: 37, condition: "Sunny" },
            { day: "Today", temp: 36, condition: "Sunny" },
            { day: "Tomorrow", temp: 38, condition: "Sunny" }
        ]
    },
    Udaipur: {
        temperature: 31, condition: "Partly Cloudy", humidity: 55, windSpeed: 13, rainChance: 20,
        forecast: [
            { day: "Yesterday", temp: 30, condition: "Cloudy" },
            { day: "Today", temp: 31, condition: "Partly Cloudy" },
            { day: "Tomorrow", temp: 32, condition: "Sunny" }
        ]
    },
    Kota: {
        temperature: 34, condition: "Cloudy", humidity: 52, windSpeed: 15, rainChance: 25,
        forecast: [
            { day: "Yesterday", temp: 32, condition: "Partly Cloudy" },
            { day: "Today", temp: 34, condition: "Cloudy" },
            { day: "Tomorrow", temp: 35, condition: "Sunny" }
        ]
    },
};

const conditionKeyMap = {
    "Sunny": "sunny",
    "Cloudy": "cloudy",
    "Partly Cloudy": "partlyCloudy",
};

const dayKeyMap = {
    "Yesterday": "yesterday",
    "Today": "today",
    "Tomorrow": "tomorrow",
};

function getWeatherStatusKey(temperature, rainChance) {
    if (temperature >= 35 || rainChance >= 40) return "extremeWeather";
    if (temperature >= 33 || rainChance >= 30) return "moderateConditions";
    return "normalWeather";
}

function getWeatherIcon(condition) {
    if (condition === "Sunny") return "☀️";
    if (condition === "Cloudy") return "☁️";
    if (condition === "Partly Cloudy") return "⛅";
    return "🌤️";
}

function getFarmingAdviceKey(temperature, rainChance) {
    if (rainChance >= 40) return "adviceHighRain";
    if (temperature >= 35) return "adviceHighTemp";
    if (rainChance <= 15) return "adviceLowRain";
    return "adviceModerate";
}

// Component for current weather information
function WeatherCard({ location, temperature, condition, humidity, windSpeed, rainChance }) {
    const { t } = useLanguage();   // ✅ ADDED

    return (
        <div className="weather-card">
            <h2>{location}</h2>

            <div className="weather-main">
                <span className="weather-icon">{getWeatherIcon(condition)}</span>
                <span className="temperature">{temperature}°C</span>
                <span className="condition">{t(conditionKeyMap[condition] || condition)}</span>   {/* ✅ FIXED */}
            </div>

            <div className="weather-details">
                <p>{t("humidityLabel")}: {humidity}%</p>       {/* ✅ FIXED */}
                <p>{t("windLabel")}: {windSpeed} km/h</p>       {/* ✅ FIXED */}
                <p>{t("rainChanceLabel")}: {rainChance}%</p>    {/* ✅ FIXED */}
            </div>

            <div className="weather-status">
                <h3>{t("weatherStatus")}</h3>                   {/* ✅ FIXED */}
                <p>{t(getWeatherStatusKey(temperature, rainChance))}</p>
            </div>

            <div className="farming-advice">
                <h3>{t("farmingAdvice")}</h3>                   {/* ✅ FIXED */}
                <p>{t(getFarmingAdviceKey(temperature, rainChance))}</p>
            </div>
        </div>
    );
}

// Component for individual forecast card
function ForecastCard({ day, temp, condition }) {
    const { t } = useLanguage();   // ✅ ADDED

    return (
        <div className="forecast-card">
            <p className="forecast-day">{t(dayKeyMap[day] || day)}</p>              {/* ✅ FIXED */}
            <div className="forecast-icon">{getWeatherIcon(condition)}</div>
            <p className="forecast-temp">{temp}°C</p>
            <p className="forecast-condition">{t(conditionKeyMap[condition] || condition)}</p>  {/* ✅ FIXED */}
        </div>
    );
}

// Main Weather component
function Weather() {
    const { t } = useLanguage();
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

    const selectedLocation = selectedDistrict
        ? `${selectedDistrict}, ${selectedState.replace("_", " ")}`
        : t("selectALocation");                     // ✅ FIXED

    const currentWeather = selectedDistrict ? weatherData[selectedDistrict] : null;

    return (
        <div className="weather-page">
            <h1>{t("weather")}</h1>

            <div className="location-selectors">
                <select
                    value={selectedState}
                    onChange={(e) => {
                        setSelectedState(e.target.value);
                        setSelectedDistrict("");
                    }}
                >
                    <option value="">{t("selectState")}</option>     {/* ✅ FIXED */}
                    {Object.keys(locationData).map((state) => (
                        <option key={state} value={state}>
                            {state.replace("_", " ")}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    disabled={!selectedState}
                >
                    <option value="">{t("selectDistrict")}</option>   {/* ✅ FIXED */}
                    {selectedState &&
                        locationData[selectedState].map((district) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                </select>
            </div>

            {currentWeather && (
                <WeatherCard
                    location={selectedLocation}
                    temperature={currentWeather.temperature}
                    condition={currentWeather.condition}
                    humidity={currentWeather.humidity}
                    windSpeed={currentWeather.windSpeed}
                    rainChance={currentWeather.rainChance}
                />
            )}

            <h3>{t("forecast")}</h3>    {/* ✅ FIXED */}

            <div className="forecast-list">
                {currentWeather?.forecast?.map((item) => (
                    <ForecastCard
                        key={item.day}
                        day={item.day}
                        temp={item.temp}
                        condition={item.condition}
                    />
                ))}
            </div>
        </div>
    );
}

export default Weather;