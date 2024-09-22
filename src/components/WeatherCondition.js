import React from 'react';

const WeatherCondition = ({ condition }) => {
  return (
    <p className="weather-condition">
      Condition: {condition.charAt(0).toUpperCase() + condition.slice(1)}
    </p>
  );
};

export default WeatherCondition;
