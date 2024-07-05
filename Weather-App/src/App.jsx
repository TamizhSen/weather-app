import React, { useState } from 'react';
import Header from "./components/Header.jsx";
import CitySelector from './components/CitySelector';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import './App.css';

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  return (
    <div className="App">
      <Header/>
      <CitySelector
        setSelectedCity={setSelectedCity}
        setWeatherData={setWeatherData}
        setForecastData={setForecastData}
      />
      {selectedCity && (
        <>
          <CurrentWeather selectedCity={selectedCity} />
          <Forecast selectedCity={selectedCity} />
        </>
      )}
    </div>
  );
}

export default App;
