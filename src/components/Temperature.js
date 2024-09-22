import React from 'react';

const Temperature = ({ temp, unit }) => {
  // Function to convert temperature based on the unit
  const convertTemperature = (temp) => {
    if (unit === 'metric') {
      return Math.round(temp); // Celsius
    } else {
      return Math.round((temp * 9/5) + 32); // Fahrenheit
    }
  };

  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="temperature">
      <span>{convertTemperature(temp)}{unitSymbol}</span>
    </div>
  );
};

export default Temperature;
