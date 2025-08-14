import { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = 'f5f50729593a39b62aea8d1bf154adfe'; // Replace with your OpenWeatherMap API key

const Weather = ({ capital, countryCode }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!capital || capital === '') return <p>No capital city available.</p>;
    if (!capital) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital},${countryCode}&appid=${API_KEY}&units=metric`;


    axios.get(url)
      .then(response => setWeather(response.data))
      .catch(error => console.error("Weather fetch error:", error));
  }, [capital]);

  if (!weather) return <p>Loading weather data...</p>;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p><strong>Condition:</strong> {weather.weather[0].description}</p>
      <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
