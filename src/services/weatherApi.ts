import { WeatherData, WeatherError } from '../types';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    // First, get coordinates for the city using geocoding
    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    const geocodingResponse = await fetch(geocodingUrl);
    
    if (!geocodingResponse.ok) {
      throw new Error('Failed to find city coordinates');
    }
    
    const geocodingData = await geocodingResponse.json();
    
    if (!geocodingData.results || geocodingData.results.length === 0) {
      throw new Error(`City "${city}" not found`);
    }
    
    const { latitude, longitude, name, country } = geocodingData.results[0];
    
    // Now fetch weather data using coordinates
    const weatherUrl = `${BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,weather_code,is_day&hourly=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`;
    
    const weatherResponse = await fetch(weatherUrl);
    
    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const weatherData = await weatherResponse.json();
    
    // Transform Open-Meteo data to our format
    const transformedData: WeatherData = {
      name: name,
      main: {
        temp: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        feels_like: weatherData.current.apparent_temperature,
        pressure: weatherData.current.pressure_msl
      },
      weather: [{
        main: getWeatherMain(weatherData.current.weather_code),
        description: getWeatherDescription(weatherData.current.weather_code),
        icon: getWeatherIcon(weatherData.current.weather_code, weatherData.current.is_day)
      }],
      wind: {
        speed: weatherData.current.wind_speed_10m
      },
      sys: {
        country: country
      },
      time: weatherData.current.time
    };
    
    return transformedData;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch weather data');
  }
};

// Weather code mapping functions
function getWeatherMain(code: number): string {
  const weatherCodes: { [key: number]: string } = {
    0: 'Clear',
    1: 'Cloudy',
    2: 'Cloudy',
    3: 'Cloudy',
    45: 'Foggy',
    48: 'Foggy',
    51: 'Rain',
    53: 'Rain',
    55: 'Rain',
    56: 'Rain',
    57: 'Rain',
    61: 'Rain',
    63: 'Rain',
    65: 'Rain',
    66: 'Rain',
    67: 'Rain',
    71: 'Snow',
    73: 'Snow',
    75: 'Snow',
    77: 'Snow',
    80: 'Rain',
    81: 'Rain',
    82: 'Rain',
    85: 'Snow',
    86: 'Snow',
    95: 'Thunderstorm',
    96: 'Thunderstorm',
    99: 'Thunderstorm'
  };
  return weatherCodes[code] || 'Unknown';
}

function getWeatherDescription(code: number): string {
  const descriptions: { [key: number]: string } = {
    0: 'clear sky',
    1: 'mainly clear',
    2: 'partly cloudy',
    3: 'overcast',
    45: 'foggy',
    48: 'depositing rime fog',
    51: 'light drizzle',
    53: 'moderate drizzle',
    55: 'dense drizzle',
    56: 'light freezing drizzle',
    57: 'dense freezing drizzle',
    61: 'slight rain',
    63: 'moderate rain',
    65: 'heavy rain',
    66: 'light freezing rain',
    67: 'heavy freezing rain',
    71: 'slight snow fall',
    73: 'moderate snow fall',
    75: 'heavy snow fall',
    77: 'snow grains',
    80: 'slight rain showers',
    81: 'moderate rain showers',
    82: 'violent rain showers',
    85: 'slight snow showers',
    86: 'heavy snow showers',
    95: 'thunderstorm',
    96: 'thunderstorm with slight hail',
    99: 'thunderstorm with heavy hail'
  };
  return descriptions[code] || 'unknown';
}

function getWeatherIcon(code: number, isDay: number): string {
  const icons: { [key: number]: string } = {
    0: isDay ? '☀️' : '🌙',
    1: isDay ? '🌤️' : '☁️',
    2: isDay ? '⛅' : '☁️',
    3: '☁️',
    45: '🌫️',
    48: '🌫️',
    51: '🌦️',
    53: '🌦️',
    55: '🌧️',
    56: '🌨️',
    57: '🌨️',
    61: '🌦️',
    63: '🌧️',
    65: '🌧️',
    66: '🌨️',
    67: '🌨️',
    71: '🌨️',
    73: '🌨️',
    75: '🌨️',
    77: '🌨️',
    80: '🌦️',
    81: '🌧️',
    82: '🌧️',
    85: '🌨️',
    86: '🌨️',
    95: '⛈️',
    96: '⛈️',
    99: '⛈️'
  };
  return icons[code] || '❓';
} 