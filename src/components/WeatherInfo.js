import React, { useState } from "react";

const WeatherInfo = ({ data, onAddToFavorites }) => {
    const [isCelsius, setIsCelsius] = useState(true);

    // Convert temperature from Kelvin to Celsius or Fahrenheit
    const convertTemperature = (kelvin) => {
        return isCelsius
            ? (kelvin - 273.15).toFixed(2)
            : ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
    };

    // Ensure that data is defined before accessing its properties
    if (!data || !data.main || !data.weather) {
        return <div>No weather data available</div>;
    }

    // Get the weather description to determine the emoji to display
    const weatherDesc = data.weather[0].description;

    // Emoji for different weather conditions
    const obj = {
        "clear sky": "☀️",
        "few clouds": "⛅",
        "scattered clouds": "☁️",
        "broken clouds": "☁️",
        "shower rain": "🌧️",
        "rain": "🌧️",
        "thunderstorm": "⛈️",
        "snow": "❄️",
       "mist": "🌫️",
    };

    return (
        <div>
            <div className="info">
                <h2>{data.name}</h2>
                <p>
                    Temperature: {convertTemperature(data.main.temp)} {isCelsius ? "°C" : "°F"}
                    <label className="switch">
                        <input 
                            type="checkbox" 
                            checked={!isCelsius}
                            onChange={() => setIsCelsius(!isCelsius)}
                        />
                        <span className="slider round"></span>
                    </label>
                </p>
                <p>Humidity: {data.main.humidity}%</p>
                <p>Wind Speed: {data.wind.speed} m/s</p>
                <p>Weather: {data.weather[0].description}</p>
                <p>Icon: {obj[weatherDesc] ? obj[weatherDesc] : "🌫️"}</p>
                <button onClick={() => onAddToFavorites(data.name)}>Add to Favorites</button>
            </div>
        </div>
    );
};

export default WeatherInfo;
