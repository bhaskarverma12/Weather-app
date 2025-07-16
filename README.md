# Weather Forecast App 🌦️

A sleek, animated weather application with dark/light theme toggle that provides current weather conditions and 5-day forecasts for any city worldwide.

## Features ✨

- **Current Weather Display**:
  - Temperature in Celsius
  - Weather condition with descriptive text
  - Location information
  - Date and time

- **Weather Highlights**:
  - Atmospheric pressure
  - Wind speed and direction
  - Sunrise and sunset times
  - Humidity levels with descriptive text
  - Visibility information
  - "Feels like" temperature

- **5-Day Forecast**:
  - Daily weather predictions at noon
  - Temperature readings
  - Weather condition icons

- **Enhanced UI**:
  - Sleek dark/light theme toggle
  - Smooth animations and transitions
  - Responsive design for all devices
  - Interactive elements with hover effects
  - Visual indicators (emojis) for weather conditions

- **Additional Features**:
  - City image display for clear sky conditions
  - Error handling with visual feedback
  - Persistent theme preference (localStorage)
  - Search functionality with Enter key support

## Technologies Used 💻

- **Frontend**:
  - HTML5, CSS3, JavaScript
  - Animate.css for animations
  - Google Fonts (Poppins)

- **API**:
  - OpenWeatherMap API for weather data

## Installation & Setup 🛠️

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd weather-app
   ```

3. Open `index.html` in your preferred browser.

4. (Optional) Replace the API key in `script.js` with your own OpenWeatherMap API key:
   ```javascript
   const API_KEY = 'your_api_key_here';
   ```

## How to Use 🚀

1. Enter a city name in the search box
2. Click "Search" or press Enter
3. View current weather conditions and forecast
4. Toggle between dark/light theme using the moon/sun button in the top-right corner

## Customization 🎨

You can easily customize the app by modifying:

- `styles.css` for visual changes
- `script.js` for functionality changes
- Add more city images in the `cityImages` object

## Future Improvements 🔮

- Add geolocation for automatic weather based on user location
- Implement temperature unit toggle (Celsius/Fahrenheit)
- Add more detailed weather charts
- Include hourly forecasts
- Add precipitation probability

## Credits 🙏

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Animations by [Animate.css](https://animate.style/)
- Icons by [OpenWeatherMap](https://openweathermap.org/weather-conditions)

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Enjoy checking the weather in style! ☀️🌧️❄️