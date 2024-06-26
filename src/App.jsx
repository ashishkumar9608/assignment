import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [alldata, setAlldata] = useState(null);
  const ApiKey = "794eba4c707bb2f044f01e4a042b0b7d";

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const getCityWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${ApiKey}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const getAlldata = async () => {
    try {
      if (weatherData && weatherData.coord) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${ApiKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch additional data');
        }
        const data = await response.json();
        setAlldata(data);
      }
    } catch (error) {
      console.error('Error fetching additional data:', error);
    }
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button onClick={getCityWeather}>Get Weather</button>

      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp} K</p>
          <p>Weather: {weatherData.weather[0].main}</p>
          <p>Latitude: {weatherData.coord.lat}</p>
          <p>Longitude: {weatherData.coord.lon}</p>
          <button onClick={getAlldata}>Get All Data</button>
        </div>
      )}

      {alldata && (
        <div>
          <h2>All Data</h2>
          <p>{JSON.stringify(alldata)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
