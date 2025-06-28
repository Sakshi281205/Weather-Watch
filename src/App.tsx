import React, { useState, useEffect } from 'react';
import { WeatherData, WeatherError } from './types';
import { fetchWeatherData } from './services/weatherApi';
import WeatherCard from './components/WeatherCard';
import './index.css';

const App: React.FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<WeatherError | null>(null);

  // Function to determine if it's day or night based on weather data
  const determineDayNight = (data: WeatherData) => {
    if (!data.time) return 'day'; // Default to day if no time data
    
    const hour = new Date(data.time).getHours();
    return (hour >= 6 && hour < 18) ? 'day' : 'night';
  };

  // Apply theme based on day/night
  useEffect(() => {
    if (weatherData) {
      const theme = determineDayNight(weatherData);
      document.body.className = theme === 'night' ? 'night' : '';
    } else {
      // Default to day theme when no weather data
      document.body.className = '';
    }
  }, [weatherData]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!city.trim()) {
      setError({
        message: 'Please enter a city name'
      });
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Failed to fetch weather data'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="weather-dashboard">
        <div className="header">
          <h1>Weather Watch</h1>
          <p>Get real-time weather information for any city</p>
        </div>

        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name (e.g., London, New York, Tokyo)"
              className="search-input"
              disabled={loading}
            />
            <button 
              type="submit" 
              className="search-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Loading...
                </>
              ) : (
                'Get Weather'
              )}
            </button>
          </form>

          {error && (
            <div className="error-message">
              {error.message}
            </div>
          )}
        </div>

        <div className="weather-display">
          {loading && (
            <div className="loading">
              <span className="spinner"></span>
              Fetching weather data...
            </div>
          )}

          {weatherData && <WeatherCard weatherData={weatherData} />}
        </div>
      </div>
    </div>
  );
};

export default App; 