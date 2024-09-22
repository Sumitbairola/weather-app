import React from 'react';

// Function to format the date and get the day of the week
const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'long' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const ForecastCard = ({ date, tempMin, tempMax, icon, unit }) => {
  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  // Convert temperatures based on the unit
  const convertTemperature = (temp) => {
    if (unit === 'metric') {
      return Math.round(temp); // Celsius
    } else {
      return Math.round((temp * 9/5) + 32); // Fahrenheit
    }
  };

  return (
    <div className="forecast-card">
      <h3>{getDayOfWeek(date)}</h3>
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather icon"
      />
      <p>
        High: {convertTemperature(tempMax)}{unitSymbol}
      </p>
      <p>
        Low: {convertTemperature(tempMin)}{unitSymbol}
      </p>
    </div>
  );
};

export default ForecastCard;
