import React, { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import "../styles/CitySelector.css"

// List of cities with their respective IDs and country codes
// These IDs correspond to OpenWeatherMap's API requirements
const cities = [
  { id: 6167865, name: "Toronto", country: "CA" },
  { id: 6094817, name: "Ottawa", country: "CA" },
  { id: 1850147, name: "Tokyo", country: "JP" },
  { id: 5128581, name: "New York City", country: "US" },
  { id: 5391959, name: "San Francisco", country: "US" },
  { id: 1264527, name: "Chennai", country: "IN" },
];

const CitySelector = ({ setSelectedCity, setWeatherData, setForecastData }) => {
  const apiKey = "538882fc8387290c6cee83f313a6acf5"; // OpenWeatherMap API key
  const [selectedCityId, setSelectedCityId] = useState("");

  /**
   * Fetches current weather data for the specified city ID
   * @param {number} cityId - The ID of the city selected
   */
  const fetchWeather = async (cityId) => {
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching the weather data", error);
    }
  };

    /**
   * Handles change in city selection from the dropdown menu
   * @param {object} event - The event object triggered by user selection
   */
  const handleChange = async (event) => {
    const cityId = event.target.value;
    setSelectedCityId(cityId);

    const selectedCity = cities.find((city) => city.id === parseInt(cityId));
    setSelectedCity(selectedCity);

    await fetchWeather(cityId); // Fetch weather data for the selected city
    setForecastData(null); // Reset forecast data in parent component when a new city is selected
  };

  return (
    <Box className="city-selector-box">
      <Typography variant="h6" gutterBottom>
        Select City
      </Typography>
      <FormControl variant="outlined" className="form-control">
        <InputLabel>City</InputLabel>
        <Select value={selectedCityId} onChange={handleChange} label="City" className="select" sx={{color: 'white'}}>"
          {cities.map((city) => (
            <MenuItem key={city.id} value={city.id}>
              {city.name}, {city.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CitySelector;
