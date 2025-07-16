const API_KEY = '5bde1ffbee0345c6f1afbc07b255421f'; // Replace with your OpenWeatherMap API key

// DOM Elements
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

// Theme toggle functionality
themeBtn.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  const isLight = body.classList.contains('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeBtn.textContent = isLight ? '🌙' : '🌓';
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  body.classList.add('light-theme');
  themeBtn.textContent = '🌙';
} else {
  body.classList.remove('light-theme');
  themeBtn.textContent = '🌓';
}

function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

function degToCompass(num) {
  const val = Math.floor((num / 22.5) + 0.5);
  const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
               "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
}

function formatDate(timestamp, timezoneOffset) {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  const options = { weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false };
  return date.toLocaleString('en-US', options);
}

function formatTime(timestamp, timezoneOffset) {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  const options = { hour: '2-digit', minute: '2-digit', hour12: true };
  return date.toLocaleString('en-US', options);
}

function mapWeatherData(apiData, forecastData) {
  const timezoneOffset = apiData.timezone;
  return {
    current: {
      temp: kelvinToCelsius(apiData.main.temp),
      dateTime: formatDate(apiData.dt, timezoneOffset),
      condition: apiData.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${apiData.weather[0].icon}@4x.png`,
      location: `${apiData.name}, ${apiData.sys.country}`,
      pressure: apiData.main.pressure,
      windSpeed: apiData.wind.speed,
      windDirection: degToCompass(apiData.wind.deg),
      sunrise: formatTime(apiData.sys.sunrise, timezoneOffset),
      sunset: formatTime(apiData.sys.sunset, timezoneOffset),
      humidity: apiData.main.humidity,
      humidityText: apiData.main.humidity < 30 ? 'Low Humidity' : 
                   (apiData.main.humidity < 60 ? 'Moderate Humidity' : 'High Humidity'),
      visibility: apiData.visibility / 1000,
      visibilityText: apiData.visibility > 10000 ? 'Excellent' : 'Poor',
      feelsLike: kelvinToCelsius(apiData.main.feels_like),
      feelsLikeText: kelvinToCelsius(apiData.main.feels_like) > 30 ? 'Hot' : 
                   (kelvinToCelsius(apiData.main.feels_like) < 10 ? 'Cold' : 'Comfortable'),
    },
    forecast: forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5).map(item => ({
      date: new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      temp: kelvinToCelsius(item.main.temp).toFixed(1),
      desc: item.weather[0].main,
      icon: item.weather[0].icon ? `https://openweathermap.org/img/wn/${item.weather[0].icon}.png` : '',
    })),
  };
}

const cityImages = {
  'Pune': 'https://images.unsplash.com/photo-1581852057101-768110090a0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  'Rajkot': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  'Khusairy': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
};

function updateDashboard(data) {
  // Add animation class to current weather
  const currentWeather = document.querySelector('.current-weather');
  currentWeather.classList.add('animate__pulse');
  setTimeout(() => {
    currentWeather.classList.remove('animate__pulse');
  }, 1000);

  // Update current weather
  document.querySelector('.temperature').textContent = `${data.current.temp.toFixed(1)} °C`;
  document.querySelector('.date-time').textContent = data.current.dateTime;

  // Check for clear sky condition and city image
  const cityName = data.current.location.split(',')[0].trim();
  const conditionLower = data.current.condition.toLowerCase();
  const weatherIcon = document.querySelector('.weather-icon img');
  
  if (conditionLower.includes('clear') && cityImages[cityName]) {
    weatherIcon.src = cityImages[cityName];
    weatherIcon.alt = `Clear sky in ${cityName}`;
  } else {
    weatherIcon.src = data.current.icon;
    weatherIcon.alt = data.current.condition;
  }

  // Add animation to weather icon
  weatherIcon.classList.add('animate__bounceIn');
  setTimeout(() => {
    weatherIcon.classList.remove('animate__bounceIn');
  }, 1000);

  document.querySelector('.weather-description .condition-text').textContent = data.current.condition;
  document.querySelector('.weather-description .location').textContent = data.current.location;

  // Update highlights with animations
  const highlights = [
    { selector: '.pressure-value', value: `${data.current.pressure} hPa` },
    { selector: '.wind-speed', value: `${data.current.windSpeed} <span>m/s</span>` },
    { selector: '.wind-direction', value: `${data.current.windDirection} →` },
    { selector: '.sunrise', value: `<span class="icon">☀️</span> ${data.current.sunrise}` },
    { selector: '.sunset', value: `<span class="icon">🌙</span> ${data.current.sunset}` },
    { selector: '.humidity-value', value: `${data.current.humidity}%` },
    { selector: '.humidity-text', value: `<strong>${data.current.humidityText}</strong> 🌵` },
    { selector: '.visibility-value', value: `${data.current.visibility} km` },
    { selector: '.visibility-text', value: `${data.current.visibilityText} 😎` },
    { selector: '.feels-value', value: `${data.current.feelsLike.toFixed(1)} °C` },
    { selector: '.feels-text', value: `${data.current.feelsLikeText} ${data.current.feelsLike > 30 ? '🔥' : data.current.feelsLike < 10 ? '❄️' : '😊'}` },
  ];

  highlights.forEach((highlight, index) => {
    setTimeout(() => {
      const element = document.querySelector(highlight.selector);
      if (element) {
        element.innerHTML = highlight.value;
        element.classList.add('animate__fadeIn');
        setTimeout(() => {
          element.classList.remove('animate__fadeIn');
        }, 500);
      }
    }, index * 100);
  });

  // Update forecast with animations
  const forecastContainer = document.querySelector('.forecast-grid');
  forecastContainer.innerHTML = '';
  
  data.forecast.forEach((day, index) => {
    setTimeout(() => {
      const card = document.createElement('div');
      card.className = 'forecast-card animate__zoomIn';
      card.innerHTML = `
        <div class="date">${day.date}</div>
        <div class="icon"><img src="${day.icon}" alt="${day.desc}" /></div>
        <div class="temp">${day.temp}°C</div>
        <div class="desc">${day.desc}</div>
      `;
      forecastContainer.appendChild(card);
      
      setTimeout(() => {
        card.classList.remove('animate__zoomIn');
      }, 1000);
    }, index * 200);
  });
}

async function fetchWeather(city) {
  try {
    document.querySelector('.weather-app').classList.add('loading');
    
    const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    if (!currentRes.ok) throw new Error('City not found');
    const currentData = await currentRes.json();

    const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
    if (!forecastRes.ok) throw new Error('Forecast not found');
    const forecastData = await forecastRes.json();

    const mappedData = mapWeatherData(currentData, forecastData);
    updateDashboard(mappedData);
    
    document.querySelector('.weather-app').classList.remove('loading');
  } catch (error) {
    // Show error animation
    const searchBox = document.querySelector('.search-box');
    searchBox.classList.add('animate__shakeX');
    setTimeout(() => {
      searchBox.classList.remove('animate__shakeX');
    }, 1000);
    
    document.querySelector('.weather-app').classList.remove('loading');
  }
}

function handleSearch() {
  const input = document.querySelector('.search-box input');
  const city = input.value.trim();
  if (!city) {
    // Shake animation for empty input
    input.classList.add('animate__shakeX');
    setTimeout(() => {
      input.classList.remove('animate__shakeX');
    }, 1000);
    return;
  }
  fetchWeather(city);
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize with a default city
  fetchWeather('Khusairy');

  const searchBtn = document.querySelector('.search-btn');
  const searchInput = document.querySelector('.search-box input');

  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });
});