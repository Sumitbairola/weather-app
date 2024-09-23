import React from 'react';

const WeatherIcon = ({ icon }) => {
  return (
    <img
      className="weather-icon"
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt="Weather icon"
    />
  );
};

export default WeatherIcon;
