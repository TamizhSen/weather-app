import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

/**
 * DataTable Component
 * Displays the weather forecast for a selected date in a tabular format.
 * @param {Object} forecastData - The weather forecast data fetched from the OpenWeatherMap API.
 * @param {string} selectedDate - The date selected by the user to view the forecast for.
 */
const DataTable = ({ forecastData, selectedDate }) => {
    /**
   * Formats a UNIX timestamp into a readable date format (e.g., "1st January 12:00 PM").
   * @param {number} timestamp - The UNIX timestamp from the forecast data.
   * @returns {string} - Formatted date string.
   */
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const time = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
    return `${day}${day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th'} ${month} ${time}`;
  };

  return (
    <TableContainer component={Paper} className="forecast-table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Date</TableCell>
            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Temp (°C)</TableCell>
            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Min Temp (°C)</TableCell>
            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Max Temp (°C)</TableCell>
            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Wind (m/s)</TableCell>
            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forecastData.list.filter(item => new Date(item.dt * 1000).toDateString() === selectedDate).map((item) => (
            <TableRow key={item.dt}>
              <TableCell sx={{ textAlign: 'center' }}>{formatDate(item.dt)}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{Math.round(item.main.temp)}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{Math.round(item.main.temp_min)}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{Math.round(item.main.temp_max)}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{Math.round(item.wind.speed)} m/sec</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{item.weather[0].description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
