import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import FavouriteCities from "./FavouriteCities";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  //Normally I would add this to a dotenv file, but for your consumption I will leave it here
  const apiKey = '961fb442e8c391b9813a48b86f8c99ea';

  const handleInputChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  // Fetch weather data from the OpenWeatherMap API when the search button is clicked
  const handleSearchClick = async () => {
    try {
      setError(null); // Clear previous errors
      const data = await fetchWeatherData(search, apiKey);
      console.log(data);
      setWeatherData(data);
      setSearch(""); // Clear search input
    } catch (err) {
      setError("Enter a valid city name or acronym");
      setWeatherData(null);
    }
  };

  // Fetch weather data from the OpenWeatherMap API
  const fetchWeatherData = async (city, apiKey) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    return data;
  };

  // Add a city to the list of favorite cities if it is not already in the list
  const handleAddToFavorites = (city) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
    }
  };

  // Fetch weather data for a selected city from the list of favorite cities and display it
  const handleSelectCity = async (city) => {
    const data = await fetchWeatherData(city, apiKey);
    setWeatherData(data);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search city..."
        value={search}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick}>Search</button>
      {error && <div>{error}</div>}
      {weatherData && (
        <WeatherInfo data={weatherData} onAddToFavorites={handleAddToFavorites} />
      )}
      <FavouriteCities favorites={favorites} onSelectCity={handleSelectCity} />
    </div>
  );
};

export default SearchBar;
