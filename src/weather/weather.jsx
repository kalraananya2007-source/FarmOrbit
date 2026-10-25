import React, { useEffect, useState } from "react";
import "./weather.css";
import { useSelector, useDispatch } from "react-redux";

import {
    setSelectedState,
    setSelectedDistrict,
    setWeatherData,
    setLoading,
    setWeatherError
} from "../redux/weatherSlice";

// Weather condition from Open-Meteo weather codes
function getCondition(code) {
    if (code === 0) return "Sunny";
    if ([1, 2].includes(code)) return "Partly Cloudy";
    if (code === 3) return "Cloudy";
    if ([45, 48].includes(code)) return "Foggy";

    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
        return "Rainy";
    }

    if ([71, 73, 75, 77, 85, 86].includes(code)) {
        return "Snowy";
    }

    if ([95, 96, 99].includes(code)) {
        return "Thunderstorm";
    }

    return "Unavailable";
}

function getWeatherIcon(condition) {
    const icons = {
        Sunny: "☀️",
        "Partly Cloudy": "🌤️",
        Cloudy: "☁️",
        Foggy: "🌫️",
        Rainy: "🌧️",
        Snowy: "❄️",
        Thunderstorm: "⛈️",
        Unavailable: "🌡️"
    };

    return icons[condition] || "🌤️";
}

function getWindDirection(degrees) {
    if (degrees == null) return "Unavailable";

    const directions = [
        "N", "NE", "E", "SE",
        "S", "SW", "W", "NW"
    ];

    return `${directions[Math.round(degrees / 45) % 8]} (${Math.round(degrees)}°)`;
}

function formatTime(value) {
    if (!value) return "Unavailable";

    const timePart = value.includes("T")
        ? value.split("T")[1]
        : value;

    const [hours, minutes] = timePart.split(":").map(Number);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
        return "Unavailable";
    }

    const period = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12;

    return `${formattedHour}:${String(minutes).padStart(2, "0")} ${period}`;
}

// Generate weather alerts from actual forecast data
function getWeatherAlerts(day) {
    const alerts = [];

    if (day.maxTemp != null && day.maxTemp >= 35) {
        alerts.push({
            type: "heat",
            icon: "🌡️",
            title: "High Temperature Alert",
            message: `Maximum temperature may reach ${day.maxTemp}°C. Monitor crop water requirements and soil moisture.`
        });
    }

    if (day.rainChance != null && day.rainChance >= 60) {
        alerts.push({
            type: "rain",
            icon: "🌧️",
            title: "Rain Alert",
            message: `Rain probability is ${day.rainChance}%. Check field drainage and review the forecast before irrigation.`
        });
    }

    if (day.windMax != null && day.windMax >= 30) {
        alerts.push({
            type: "wind",
            icon: "💨",
            title: "Strong Wind Alert",
            message: `Maximum forecast wind speed is ${day.windMax} km/h. Check conditions before spraying or carrying out fieldwork.`
        });
    }

    if (day.condition === "Thunderstorm") {
        alerts.push({
            type: "storm",
            icon: "⛈️",
            title: "Thunderstorm Alert",
            message: "Thunderstorms are forecast. Check local official weather warnings and avoid exposed fieldwork during lightning."
        });
    }

    if (alerts.length === 0) {
        alerts.push({
            type: "normal",
            icon: "✅",
            title: "No Major Weather Alert",
            message: "No alert conditions were detected by this page's basic thresholds. Continue monitoring local weather."
        });
    }

    return alerts;
}

// Generate farming advice using selected day's weather data
function getFarmingRecommendations(day) {
    const recommendations = [];

    if (day.maxTemp != null && day.maxTemp >= 35) {
        recommendations.push({
            icon: "☀️",
            title: "Manage Heat Stress",
            text: "Monitor soil moisture and crop stress. Plan irrigation according to crop requirements and local conditions."
        });
    }

    if (day.rainChance != null && day.rainChance >= 60) {
        recommendations.push({
            icon: "🌧️",
            title: "Prepare for Rain",
            text: "Check field drainage and postpone irrigation if rainfall makes it unnecessary. Review the latest forecast before spraying."
        });
    }

    if (day.windMax != null && day.windMax >= 30) {
        recommendations.push({
            icon: "💨",
            title: "Check Wind Conditions",
            text: "Strong winds can affect spraying and field operations. Check product instructions and local conditions before proceeding."
        });
    }

    if (
        day.condition === "Thunderstorm" ||
        (day.rainChance != null && day.rainChance >= 80)
    ) {
        recommendations.push({
            icon: "🛡️",
            title: "Protect Field Operations",
            text: "Review local warnings, check drainage and avoid exposed fieldwork during thunderstorms."
        });
    }

    if (day.rainChance != null && day.rainChance <= 20) {
        recommendations.push({
            icon: "💧",
            title: "Review Irrigation Needs",
            text: "Rain probability is low. Check soil moisture and crop water requirements before deciding whether irrigation is needed."
        });
    }

    if (recommendations.length === 0) {
        recommendations.push({
            icon: "🌱",
            title: "General Crop Care",
            text: "Monitor soil moisture, inspect crop conditions and check the latest forecast before irrigation, spraying or fieldwork."
        });
    }

    return recommendations;
}

function Weather() {
    const dispatch = useDispatch();

    const selectedDistrict = useSelector(
        (state) => state.weather.selectedDistrict
    );

    const currentWeather = useSelector(
        (state) => state.weather.weatherData
    );

    const loading = useSelector(
        (state) => state.weather.loading
    );

    const error = useSelector(
        (state) => state.weather.error
    );

    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState("");
    const [selectedDay, setSelectedDay] = useState(1);

    const days = currentWeather?.days || [];
    const day = days[selectedDay];

    // Search for Indian cities
    async function searchCity(event) {
        if (event) event.preventDefault();

        const query = searchText.trim();

        if (!query) {
            setSearchError("Please enter a city name.");
            setSearchResults([]);
            return;
        }

        setSearchLoading(true);
        setSearchError("");
        setSearchResults([]);

        try {
            const url =
                `https://geocoding-api.open-meteo.com/v1/search` +
                `?name=${encodeURIComponent(query)}` +
                `&count=10&language=en&format=json&countryCode=IN`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Unable to search cities.");
            }

            const data = await response.json();

            const results = (data.results || []).filter(
                (city) => city.country_code === "IN"
            );

            if (results.length === 0) {
                setSearchError("No matching Indian city found. Try another name.");
            } else {
                setSearchResults(results);
            }
        } catch {
            setSearchError("City search failed. Check your internet and try again.");
        } finally {
            setSearchLoading(false);
        }
    }

    // Select a city from search results
    function selectCity(city) {
        const selectedCity = {
            name: city.name,
            state: city.admin1 || "",
            latitude: city.latitude,
            longitude: city.longitude
        };

        dispatch(setSelectedState(selectedCity.state));
        dispatch(setSelectedDistrict(selectedCity));

        setSearchText(city.name);
        setSearchResults([]);
        setSearchError("");
        setSelectedDay(1);
    }

    // Fetch yesterday, today and tomorrow's weather
    useEffect(() => {
        if (
            !selectedDistrict ||
            selectedDistrict.latitude == null ||
            selectedDistrict.longitude == null
        ) {
            return;
        }

        let cancelled = false;

        async function fetchWeather() {
            dispatch(setLoading(true));
            dispatch(setWeatherError(null));

            try {
                const latitude = selectedDistrict.latitude;
                const longitude = selectedDistrict.longitude;

                const url =
                    `https://api.open-meteo.com/v1/forecast` +
                    `?latitude=${latitude}` +
                    `&longitude=${longitude}` +
                    `&hourly=relative_humidity_2m,pressure_msl,visibility` +
                    `&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,precipitation_probability_max,precipitation_sum,rain_sum,uv_index_max,wind_speed_10m_max,wind_direction_10m_dominant` +
                    `&past_days=1&forecast_days=2&timezone=auto`;

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Weather data could not be loaded.");
                }

                const data = await response.json();

                if (!data.daily || !data.daily.time) {
                    throw new Error("Weather data is unavailable for this location.");
                }

                const dateLabels = ["Yesterday", "Today", "Tomorrow"];

                const processedDays = data.daily.time.map((date, index) => {
                    const hourlyIndexes = (data.hourly?.time || [])
                        .map((time, hourIndex) => ({ time, hourIndex }))
                        .filter((item) => item.time.startsWith(date))
                        .map((item) => item.hourIndex);

                    function hourlyAverage(key) {
                        const values = hourlyIndexes
                            .map((i) => data.hourly?.[key]?.[i])
                            .filter((value) => value != null && Number.isFinite(value));

                        if (!values.length) return null;

                        return values.reduce((sum, value) => sum + value, 0) / values.length;
                    }

                    const code = data.daily.weather_code?.[index];
                    const maxTemp = data.daily.temperature_2m_max?.[index];
                    const minTemp = data.daily.temperature_2m_min?.[index];
                    const rainChance = data.daily.precipitation_probability_max?.[index];
                    const rainfall = data.daily.precipitation_sum?.[index];
                    const windMax = data.daily.wind_speed_10m_max?.[index];

                    return {
                        date,
                        label: dateLabels[index] || date,
                        condition: getCondition(code),
                        maxTemp: maxTemp ?? null,
                        minTemp: minTemp ?? null,
                        feelsLikeMax: data.daily.apparent_temperature_max?.[index] ?? null,
                        rainChance: rainChance ?? null,
                        rainfall: rainfall ?? null,
                        rainOnly: data.daily.rain_sum?.[index] ?? null,
                        windMax: windMax ?? null,
                        windDirection: data.daily.wind_direction_10m_dominant?.[index] ?? null,
                        uvMax: data.daily.uv_index_max?.[index] ?? null,
                        humidity: hourlyAverage("relative_humidity_2m"),
                        pressure: hourlyAverage("pressure_msl"),
                        visibility: hourlyAverage("visibility"),
                        sunrise: data.daily.sunrise?.[index] ?? null,
                        sunset: data.daily.sunset?.[index] ?? null
                    };
                });

                if (!cancelled) {
                    dispatch(setWeatherData({ days: processedDays }));
                    setSelectedDay(1);
                }
            } catch (err) {
                if (!cancelled) {
                    dispatch(
                        setWeatherError(
                            err.message || "Unable to load weather data."
                        )
                    );
                }
            } finally {
                if (!cancelled) {
                    dispatch(setLoading(false));
                }
            }
        }

        fetchWeather();

        return () => {
            cancelled = true;
        };
    }, [
        selectedDistrict?.latitude,
        selectedDistrict?.longitude,
        dispatch
    ]);

    return (
        <main className="weather-page">
            <div className="weather-heading">
                <span className="weather-eyebrow">🌱 FARMORBIT AGRICULTURE</span>

                <h1>Weather & Farm Conditions</h1>

                <p>
                    Understand the weather. Make more informed farming decisions.
                </p>
            </div>

            <form className="location-selectors" onSubmit={searchCity}>
                <label htmlFor="weather-city-search">
                    Search an Indian city
                </label>

                <div className="city-search-row">
                    <input
                        id="weather-city-search"
                        type="text"
                        value={searchText}
                        placeholder="Enter city name..."
                        onChange={(event) => setSearchText(event.target.value)}
                    />

                    <button type="submit" disabled={searchLoading}>
                        {searchLoading ? "Searching..." : "🔍 Search"}
                    </button>
                </div>

                {searchError && (
                    <p className="weather-search-error">{searchError}</p>
                )}

                {searchResults.length > 0 && (
                    <div className="city-search-results">
                        {searchResults.map((city, index) => (
                            <button
                                className="city-search-result"
                                type="button"
                                key={`${city.latitude}-${city.longitude}-${index}`}
                                onClick={() => selectCity(city)}
                            >
                                <span>📍 {city.name}</span>
                                <small>
                                    {[city.admin1, city.country].filter(Boolean).join(", ")}
                                </small>
                            </button>
                        ))}
                    </div>
                )}
            </form>

            {selectedDistrict && (
                <div className="selected-location">
                    📍 {selectedDistrict.name || "Selected location"}
                    {selectedDistrict.state ? `, ${selectedDistrict.state}` : ""}
                </div>
            )}

            {loading && (
                <div className="weather-message">
                    <span className="loading-sun">☀️</span>
                    <p>Fetching weather data...</p>
                </div>
            )}

            {error && !loading && (
                <div className="weather-error">
                    <span>⚠️</span>
                    <p>{String(error)}</p>
                    <button
                        type="button"
                        onClick={() => {
                            if (selectedDistrict?.latitude != null) {
                                dispatch(setSelectedDistrict({ ...selectedDistrict }));
                            }
                        }}
                    >
                        Try Again
                    </button>
                </div>
            )}

            {!selectedDistrict && !loading && (
                <div className="weather-empty">
                    <span>🌍</span>
                    <h2>Choose a city to get started</h2>
                    <p>Search for an Indian city to view its weather and farming insights.</p>
                </div>
            )}

            {!loading && !error && day && (
                <>
                    <section className="weather-day-tabs" aria-label="Select forecast day">
                        {days.map((item, index) => (
                            <button
                                type="button"
                                key={item.date}
                                className={selectedDay === index ? "active" : ""}
                                onClick={() => setSelectedDay(index)}
                            >
                                <span>{item.label}</span>
                                <small>{item.date}</small>
                            </button>
                        ))}
                    </section>

                    <section className="weather-card">
                        <div className="weather-main">
                            <div className="weather-icon">
                                {getWeatherIcon(day.condition)}
                            </div>

                            <div className="weather-summary">
                                <span className="weather-date">
                                    {day.label} · {day.date}
                                </span>

                                <h2>
                                    {day.maxTemp != null ? `${Math.round(day.maxTemp)}°C` : "Unavailable"}
                                </h2>

                                <p className="condition">{day.condition}</p>

                                <p className="temperature-range">
                                    Min {day.minTemp != null ? `${Math.round(day.minTemp)}°C` : "—"}
                                    {" "} · {" "}
                                    Max {day.maxTemp != null ? `${Math.round(day.maxTemp)}°C` : "—"}
                                </p>
                            </div>
                        </div>

                        <div className="weather-details">
                            <WeatherDetail
                                icon="🌡️"
                                label="Feels Like (Max)"
                                value={day.feelsLikeMax != null ? `${Math.round(day.feelsLikeMax)}°C` : "Unavailable"}
                            />

                            <WeatherDetail
                                icon="💧"
                                label="Humidity (Daily Avg.)"
                                value={day.humidity != null ? `${Math.round(day.humidity)}%` : "Unavailable"}
                            />

                            <WeatherDetail
                                icon="🌧️"
                                label="Rain Probability"
                                value={day.rainChance != null ? `${day.rainChance}%` : "Unavailable"}
                            />

                            <WeatherDetail
                                icon="🌦️"
                                label="Total Precipitation"
                                value={day.rainfall != null ? `${day.rainfall.toFixed(1)} mm` : "Unavailable"}
                            />

                            <WeatherDetail
                                icon="💨"
                                label="Max Wind Speed"
                                value={day.windMax != null ? `${Math.round(day.windMax)} km/h` : "Unavailable"}
                            />

                            <WeatherDetail
                                icon="🧭"
                                label="Dominant Wind"
                                value={getWindDirection(day.windDirection)}
                            />

                            <WeatherDetail
                                icon="☀️"
                                label="Maximum UV Index"
                                value={day.uvMax != null ? day.uvMax.toFixed(1) : "Unavailable"}
                            />

                            <WeatherDetail
                                icon="🌫️"
                                label="Visibility (Daily Avg.)"
                                value={day.visibility != null ? `${(day.visibility / 1000).toFixed(1)} km` : "Unavailable"}
                            />

                            <WeatherDetail
                                icon="📊"
                                label="Pressure (Daily Avg.)"
                                value={day.pressure != null ? `${Math.round(day.pressure)} hPa` : "Unavailable"}
                            />
                        </div>

                        <p className="weather-data-note">
                            Weather values are API forecasts or model estimates and may differ from
                            conditions measured at the field.
                        </p>
                    </section>

                    <section className="weather-section">
                        <div className="section-heading">
                            <span>⚠️</span>
                            <div>
                                <h2>Weather Alerts</h2>
                                <p>Conditions that may need your attention</p>
                            </div>
                        </div>

                        <div className="weather-alert-grid">
                            {getWeatherAlerts(day).map((alert, index) => (
                                <article
                                    className={`weather-alert alert-${alert.type}`}
                                    key={`${alert.type}-${index}`}
                                >
                                    <span className="alert-icon">{alert.icon}</span>
                                    <div>
                                        <h3>{alert.title}</h3>
                                        <p>{alert.message}</p>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <p className="weather-data-note">
                            These are informational alerts generated by this app, not official
                            government weather warnings.
                        </p>
                    </section>

                    <section className="weather-section farming-section">
                        <div className="section-heading">
                            <span>🌾</span>
                            <div>
                                <h2>Smart Farming Recommendations</h2>
                                <p>Suggestions based on {day.label.toLowerCase()}'s weather forecast</p>
                            </div>
                        </div>

                        <div className="recommendation-grid">
                            {getFarmingRecommendations(day).map((item, index) => (
                                <article className="recommendation-card" key={`${item.title}-${index}`}>
                                    <span className="recommendation-icon">{item.icon}</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </article>
                            ))}
                        </div>

                        <p className="weather-data-note">
                            Recommendations are general guidance. Crop type, growth stage, soil
                            moisture and local agricultural advice should also be considered.
                        </p>
                    </section>
                </>
            )}
        </main>
    );
}

function WeatherDetail({ icon, label, value }) {
    return (
        <div className="weather-detail-item">
            <span className="detail-icon">{icon}</span>
            <span className="detail-label">{label}</span>
            <strong>{value}</strong>
        </div>
    );
}

export default Weather;
