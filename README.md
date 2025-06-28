# Weather Watch - Real-time Weather Dashboard

A modern, responsive weather dashboard built with React and TypeScript that fetches real-time weather data using the **Open-Meteo API** (free, no API key required!).

## Features

- 🌍 **Real-time Weather Data**: Get current weather information for any city worldwide
- 🌡️ **Temperature Display**: Current temperature in Celsius with "feels like" temperature
- 💧 **Humidity Information**: Current humidity percentage
- 💨 **Wind Data**: Wind speed in kilometers per hour
- 📊 **Pressure Data**: Atmospheric pressure in hectopascals
- 🎨 **Dynamic Weather UI**: Beautiful weather-based backgrounds and animations
- 🌤️ **Weather Icons**: Animated weather icons that change based on conditions
- ⚡ **Fast & Responsive**: Built with Vite for optimal performance
- 📱 **Mobile Friendly**: Responsive design that works on all devices
- 🔄 **Loading States**: Smooth loading animations and error handling
- 🎭 **Weather Animations**: Special animations for different weather conditions

## Screenshots

The dashboard features a clean, modern interface with:
- Search input for city names
- Beautiful weather cards with dynamic backgrounds based on weather conditions
- Animated weather icons (sun, clouds, rain, snow, etc.)
- Detailed weather information display
- Responsive design for mobile and desktop

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- **No API key required!** (Uses free Open-Meteo API)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Weather-Watch
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

The application will open in your browser at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

## Usage

1. **Enter a City Name**: Type the name of any city in the search input (e.g., "London", "New York", "Tokyo", "Berlin")
2. **Get Weather Data**: Click the "Get Weather" button or press Enter
3. **View Results**: The dashboard will display:
   - Current temperature with animated weather icon
   - Weather description (e.g., "clear sky", "moderate rain")
   - Feels like temperature
   - Humidity percentage
   - Wind speed in km/h
   - Atmospheric pressure

## Weather-Based UI Features

The dashboard automatically adapts its appearance based on weather conditions:

- **☀️ Clear Sky**: Blue gradient background with rotating sun animation
- **☁️ Cloudy**: Gray gradient background with floating cloud animation
- **🌧️ Rain**: Blue gradient background with rain drop animation
- **🌨️ Snow**: White gradient background with snow fall animation
- **⛈️ Thunderstorm**: Dark gradient background with lightning animation
- **🌫️ Foggy**: Purple gradient background with floating fog animation

## Project Structure

```
Weather-Watch/
├── src/
│   ├── components/
│   │   └── WeatherCard.tsx      # Weather display component with animations
│   ├── services/
│   │   └── weatherApi.ts        # Open-Meteo API service functions
│   ├── types.ts                 # TypeScript type definitions
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   ├── index.css                # Global styles with weather animations
│   └── vite-env.d.ts            # Vite environment types
├── index.html                   # HTML template
├── package.json                 # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite build configuration
└── README.md                   # Project documentation
```

## Technologies Used

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and development server
- **Open-Meteo API**: Free weather data provider (no API key required)
- **CSS3**: Modern styling with gradients, animations, and weather-based themes

## API Information

This project uses the **Open-Meteo API**:
- **Base URL**: `https://api.open-meteo.com/v1/forecast`
- **Geocoding**: `https://geocoding-api.open-meteo.com/v1/search`
- **Features**: Free, no API key required, high accuracy
- **Data**: Current weather, hourly forecasts, 7-day forecasts
- **Rate Limit**: 10,000 requests per day (generous for personal use)

### Weather Codes

The API uses WMO (World Meteorological Organization) weather codes:
- **0**: Clear sky
- **1-3**: Cloudy conditions
- **45, 48**: Foggy conditions
- **51-67**: Rain conditions
- **71-77**: Snow conditions
- **80-86**: Rain/Snow showers
- **95-99**: Thunderstorm conditions

## Error Handling

The application handles various error scenarios:
- Invalid city names
- Network connectivity issues
- API rate limiting
- Server errors

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues or have questions:
1. Check the [Open-Meteo API documentation](https://open-meteo.com/en/docs)
2. Verify your internet connection
3. Check the browser console for any error messages
4. Ensure the city name is spelled correctly

## Future Enhancements

- [ ] 5-day weather forecast with charts
- [ ] Weather maps integration
- [ ] Location-based weather (GPS)
- [ ] Weather alerts and notifications
- [ ] Dark/light theme toggle
- [ ] Multiple city comparison
- [ ] Weather history charts
- [ ] Unit conversion (Celsius/Fahrenheit)
- [ ] Hourly forecast display
- [ ] Weather radar integration

---

**Note**: This project uses the free Open-Meteo API, so no API key configuration is required. The API is reliable and suitable for production use.