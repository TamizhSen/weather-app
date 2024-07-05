import React, { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import "../styles/CitySelector.css"

const cities = [
  { id: 6167865, name: "Toronto", country: "CA" },
  { id: 6094817, name: "Ottawa", country: "CA" },
  { id: 1850147, name: "Tokyo", country: "JP" },
  { id: 5128581, name: "New York City", country: "US" },
  { id: 5391959, name: "San Francisco", country: "US" },
  { id: 1264527, name: "Chennai", country: "IN" },
];

const CitySelector = ({ setSelectedCity, setWeatherData, setForecastData }) => {
  const apiKey = "538882fc8387290c6cee83f313a6acf5";
  const [selectedCityId, setSelectedCityId] = useState("");

  const fetchWeather = async (cityId) => {
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching the weather data", error);
    }
  };

  const handleChange = async (event) => {
    const cityId = event.target.value;
    setSelectedCityId(cityId);

    const selectedCity = cities.find((city) => city.id === parseInt(cityId));
    setSelectedCity(selectedCity);

    await fetchWeather(cityId);
    setForecastData(null); 
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
