import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import DataTable from './DataTable';
import '../styles/Forecast.css';

/**
 * Forecast Component
 * Displays the 5-day weather forecast for the selected city.
 * Includes the ability to view forecasts for individual days.
 * @param {Object} selectedCity - The city object selected by the user, containing its ID and name.
 */

const Forecast = ({ selectedCity }) => {
  const [forecastData, setForecastData] = useState(null);  // State to store forecast data
  const [selectedDate, setSelectedDate] = useState(null); // State to track the currently selected date
  const [isTableVisible, setIsTableVisible] = useState(false); // State to toggle the visibility of the forecast table

  const fetchForecast = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?id=${selectedCity.id}&appid=538882fc8387290c6cee83f313a6acf5&units=metric`
      );
      const data = await response.json();
      setForecastData(data);

      const uniqueDates = getUniqueDates(data.list);
      if (uniqueDates.length > 0) {
        setSelectedDate(uniqueDates[0]); // Set the first date as the default
      }
      setIsTableVisible(true);
    } catch (error) {
      console.error("Error fetching the forecast data", error);
    }
  };

  /**
   * Extracts unique dates from the forecast data list.
   * @param {Array} list - The forecast list from API response.
   * @returns {Array} Array of unique dates.
   */
  const getUniqueDates = (list) => {
    const dates = list.map(item => new Date(item.dt * 1000).toDateString());
    return [...new Set(dates)];
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCloseTable = () => {
    setIsTableVisible(false);
  };

  // Display a message if no city is selected
  if (!selectedCity) {
    return <div>Please select a city to see the forecast.</div>;
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={fetchForecast}>
        See Forecast
      </Button>
      {isTableVisible && forecastData && (
        <Box className="city-selector-box">
          <Typography variant="h6" gutterBottom>
            5-Day Forecast
          </Typography>
          <Box display="flex" justifyContent="center" mb={2}>
            {getUniqueDates(forecastData.list).map((date) => (
              <Button
                key={date}
                variant={selectedDate === date ? "contained" : "outlined"}
                onClick={() => handleDateChange(date)}
                sx={{
                  margin: '0 5px',
                  backgroundColor: selectedDate === date ? 'primary.main' : 'grey.200',
                  color: selectedDate === date ? 'white' : 'black'
                }}
              >
                {date}
              </Button>
            ))}
          </Box>
          <Button variant="contained" color="secondary" onClick={handleCloseTable} sx={{ mb: 2 }}>
            Close
          </Button>
          <DataTable forecastData={forecastData} selectedDate={selectedDate} />
        </Box>
      )}
    </div>
  );
};

export default Forecast;
