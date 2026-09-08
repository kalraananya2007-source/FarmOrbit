//testing commit
import React, { useState } from "react";
import "./weather.css";

const locationData = {
    Punjab: [
        "Patiala",
        "Amritsar",
        "Ludhiana",
        "Jalandhar"
    ],

    Haryana: [
        "Hisar",
        "Karnal",
        "Rohtak",
        "Panipat"
    ],

    Himachal_Pradesh: [
        "Shimla",
        "Manali",
        "Kangra",
        "Solan"
    ],

    Rajasthan: [
        "Jaipur",
        "Jodhpur",
        "Udaipur",
        "Kota"
    ]
};

// Weather data
const weatherData = {
    Patiala: {
        temperature: 31,
        condition: "Partly Cloudy",
        humidity: 68,
        windSpeed: 14,
        rainChance: 30,
        forecast: [
            { day: "Yesterday", temp: 29 },
            { day: "Today", temp: 31 },
            { day: "Tomorrow", temp: 32 }
        ]
    },

    Amritsar: {
        temperature: 30,
        condition: "Sunny",
        humidity: 62,
        windSpeed: 12,
        rainChance: 20,
        forecast: [
            { day: "Yesterday", temp: 30 },
            { day: "Today", temp: 32 },
            { day: "Tomorrow", temp: 31 }
        ]
    },

    Ludhiana: {
        temperature: 32,
        condition: "Cloudy",
        humidity: 70,
        windSpeed: 15,
        rainChance: 35,
        forecast: [
            { day: "Yesterday", temp: 30},
            { day: "Today", temp: 32 },
            { day: "Tomorrow", temp: 33 }
        ]
    },

    Jalandhar: {
        temperature: 31,
        condition: "Partly Cloudy",
        humidity: 67,
        windSpeed: 13,
        rainChance: 28,
        forecast: [
            { day: "Yesterday", temp: 33},
            { day: "Today", temp: 31 },
            { day: "Tomorrow", temp: 32 }
        ]
    },

    Hisar: {
        temperature: 34,
        condition: "Sunny",
        humidity: 50,
        windSpeed: 16,
        rainChance: 15,
        forecast: [
            { day: "Yesterday", temp: 32},
            { day: "Today", temp: 34 },
            { day: "Tomorrow", temp: 35 }
        ]
    },

    Karnal: {
        temperature: 32,
        condition: "Cloudy",
        humidity: 64,
        windSpeed: 14,
        rainChance: 30,
        forecast: [
            { day: "Yesterday", temp: 30},
            { day: "Today", temp: 32 },
            { day: "Tomorrow", temp: 33 }
        ]
    },

    Rohtak: {
        temperature: 33,
        condition: "Sunny",
        humidity: 55,
        windSpeed: 15,
        rainChance: 18,
        forecast: [
            { day: "Yesterday", temp: 31},
            { day: "Today", temp: 33 },
            { day: "Tomorrow", temp: 34 }
        ]
    },

    Panipat: {
        temperature: 32,
        condition: "Partly Cloudy",
        humidity: 60,
        windSpeed: 13,
        rainChance: 25,
        forecast: [
            { day: "Yesterday", temp: 30},
            { day: "Today", temp: 32 },
            { day: "Tomorrow", temp: 33 },
        ]
    },

    Shimla: {
    temperature: 22,
    condition: "Cloudy",
    humidity: 72,
    windSpeed: 10,
    rainChance: 40,
    forecast: [
        { day: "Yesterday", temp: 24},
        { day: "Today", temp: 22 },
        { day: "Tomorrow", temp: 23 }
    ]
},

Manali: {
    temperature: 18,
    condition: "Partly Cloudy",
    humidity: 75,
    windSpeed: 9,
    rainChance: 45,
    forecast: [
        { day: "Yesterday", temp: 15},
        { day: "Today", temp: 18 },
        { day: "Tomorrow", temp: 19 }
    ]
},

Kangra: {
    temperature: 25,
    condition: "Cloudy",
    humidity: 70,
    windSpeed: 11,
    rainChance: 35,
    forecast: [
        { day: "Yesterday", temp: 23},
        { day: "Today", temp: 25 },
        { day: "Tomorrow", temp: 26 }
    ]
},

Solan: {
    temperature: 24,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 10,
    rainChance: 30,
    forecast: [
        { day: "Yesterday", temp: 22},
        { day: "Today", temp: 24 },
        { day: "Tomorrow", temp: 25 }
    ]
},

Jaipur: {
    temperature: 35,
    condition: "Sunny",
    humidity: 45,
    windSpeed: 18,
    rainChance: 10,
    forecast: [
        { day: "Yesterday", temp: 33},
        { day: "Today", temp: 35 },
        { day: "Tomorrow", temp: 36 }
    ]
},

Jodhpur: {
    temperature: 37,
    condition: "Sunny",
    humidity: 38,
    windSpeed: 20,
    rainChance: 8,
    forecast: [
        { day: "Yesterday", temp: 37 },
        { day: "Today", temp: 36 },
        { day: "Tomorrow", temp: 38 }
    ]
},

Udaipur: {
    temperature: 31,
    condition: "Partly Cloudy",
    humidity: 55,
    windSpeed: 13,
    rainChance: 20,
    forecast: [
        { day: "Yesterday", temp: 30 },
        { day: "Today", temp: 31 },
        { day: "Tomorrow", temp: 32 }
        
    ]
},

Kota: {
    temperature: 34,
    condition: "Cloudy",
    humidity: 52,
    windSpeed: 15,
    rainChance: 25,
    forecast: [
        { day: "Yesterday", temp: 32},
        { day: "Today", temp: 34 },
        { day: "Tomorrow", temp: 35 }
    ]
},    

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
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

    const selectedLocation = selectedDistrict
    ? `${selectedDistrict}, ${selectedState.replace("_", " ")}`
    : "Select a location";

    const currentWeather = selectedDistrict
    ? weatherData[selectedDistrict]
    : null;

    return (
        <div className="weather-page">

            <h1>Weather</h1>

            <div className="location-selectors">

    <select
        value={selectedState}
        onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedDistrict("");
        }}
    >
        <option value="">Select State</option>

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
        <option value="">Select District</option>

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
            <h3>Forecast</h3>

            <div className="forecast-list">

            {currentWeather?.forecast?.map((item) => (
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