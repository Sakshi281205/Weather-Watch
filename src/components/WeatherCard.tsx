import React from 'react';
import { WeatherData } from '../types';

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const { name, main, weather, wind, sys, time } = weatherData;
  const weatherInfo = weather[0];

  // Format the time
  const formatTime = (timeString?: string) => {
    if (!timeString) return '';
    const date = new Date(timeString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  // Get CSS class based on weather
  const getWeatherClass = (weatherMain: string) => {
    return weatherMain.toLowerCase();
  };

  const weatherClass = getWeatherClass(weatherInfo.main);
  const formattedTime = formatTime(time);

  return (
    <div className={`weather-card ${weatherClass}`}>
      <div className="weather-header">
        <h2>{name}, {sys.country}</h2>
        <div className="weather-icon">{weatherInfo.icon}</div>
      </div>
      
      <div className="temperature">{Math.round(main.temp)}°C</div>
      <div className="weather-description">{weatherInfo.description}</div>
      
      {formattedTime && (
        <div className="weather-time">
          📅 {formattedTime}
        </div>
      )}
      
      <div className="weather-details">
        <div className="weather-detail">
          <h3>Feels Like</h3>
          <p>{Math.round(main.feels_like)}°C</p>
        </div>
        <div className="weather-detail">
          <h3>Humidity</h3>
          <p>{main.humidity}%</p>
        </div>
        <div className="weather-detail">
          <h3>Wind Speed</h3>
          <p>{wind.speed} km/h</p>
        </div>
        <div className="weather-detail">
          <h3>Pressure</h3>
          <p>{main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 