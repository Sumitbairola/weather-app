import React, { useState, useEffect, useCallback, useRef } from 'react';
import CityName from './components/CityName';
import ForecastCard from './components/ForecastCard';
import SearchBox from './components/SearchBox';
import Temperature from './components/Temperature';
import WeatherCondition from './components/WeatherCondition';
import WeatherIcon from './components/WeatherIcon';
import { fetchWeatherData } from './utils/Api';
import './styles/App.css';
import './styles/Components.css';

const App = () => {
  const [city, setCity] = useState({ name: 'New Delhi', lat: 28.6139, lon: 77.2090 }); // Default city
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [unit, setUnit] = useState('metric'); // Default unit is Celsius
  const [isPulling, setIsPulling] = useState(false);
  const appRef = useRef(null);

  const fetchWeather = useCallback(async () => {
    try {
      const cachedData = localStorage.getItem(city.name);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setWeatherData(parsedData.weather);
        setForecastData(parsedData.forecast.list.filter((item, index) => index % 8 === 0));
        return;
      }

      const data = await fetchWeatherData(city.lat, city.lon, unit);
      setWeatherData(data.weather);
      setForecastData(data.forecast.list.filter((item, index) => index % 8 === 0));

      localStorage.setItem(city.name, JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setForecastData([]);
    }
  }, [city, unit]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const handleCitySelection = (selectedCity) => {
    setCity({ name: selectedCity.name, lat: selectedCity.lat, lon: selectedCity.lon });
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const handlePullToRefresh = (e) => {
    if (isPulling) {
      return;
    }

    const touchStartY = e.touches[0].clientY;
    const handleTouchMove = (event) => {
      const touchMoveY = event.touches[0].clientY;
      if (touchMoveY - touchStartY > 50) {
        setIsPulling(true);
        fetchWeather();
        appRef.current.removeEventListener('touchmove', handleTouchMove);
      }
    };

    appRef.current.addEventListener('touchmove', handleTouchMove);
    appRef.current.addEventListener('touchend', () => {
      appRef.current.removeEventListener('touchmove', handleTouchMove);
      setIsPulling(false);
    });
  };

  return (
    <div className="app" ref={appRef} onTouchStart={handlePullToRefresh}>
      <header>
        <h1>Weather Forecast</h1>
        <SearchBox onCitySelect={handleCitySelection} />
      </header>

      <div className="weather-container">
        {weatherData ? (
          <>
            <CityName name={city.name} />
            <Temperature temp={Math.round(weatherData.main.temp)} unit={unit} />
            <WeatherCondition condition={weatherData.weather[0].description} />
            <WeatherIcon icon={weatherData.weather[0].icon} />
          </>
        ) : (
          <p>No weather data available. Please select a valid city.</p>
        )}
      </div>

      <div className="forecast-container">
        {forecastData.length > 0 ? (
          forecastData.map((forecast, index) => (
            <ForecastCard
              key={index}
              date={forecast.dt_txt}
              tempMin={forecast.main.temp_min}
              tempMax={forecast.main.temp_max}
              icon={forecast.weather[0].icon}
              unit={unit}
            />
          ))
        ) : (
          <p>No forecast data available.</p>
        )}
      </div>

      <button className="toggle-unit" onClick={toggleUnit}>
        Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>
    </div>
  );
};

export default App;