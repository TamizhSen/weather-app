import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

/**
 * Component to display current weather for a selected city
 * @param {Object} selectedCity - The city object selected by the user, containing its ID and name
 */
const CurrentWeather = ({ selectedCity }) => {
  const [weatherData, setWeatherData] = useState(null);

    /**
   * useEffect Hook:
   * Triggers when `selectedCity` changes.
   * Fetches current weather data for the selected city using OpenWeatherMap API.
   */
  useEffect(() => {
    if (selectedCity) {
      const fetchWeather = async () => {
        try {
          const response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?id=${selectedCity.id}&appid=538882fc8387290c6cee83f313a6acf5&units=metric`
          );
          const data = await response.json();
          setWeatherData(data);
        } catch (error) {
          console.error("Error fetching the weather data", error);
        }
      };
      fetchWeather();
    }
  }, [selectedCity]);

  // Display a message if no weather data is available
  if (!weatherData) {
    return <div>Please select a city to see the weather.</div>;
  }

  return (
    <Box className="city-selector-box">
      <h2>Current Weather in {weatherData.name}</h2>
      <p>Weather:</p>
      <span>{weatherData.weather[0].main}</span>
      <span> {weatherData.weather[0].description}</span>
      <p>Temperature:</p>
      <span>{Math.round(weatherData.main.temp)} °C</span>
      <span> Wind {weatherData.wind.speed} m/sec</span>
    </Box>
  );
};

export default CurrentWeather;
