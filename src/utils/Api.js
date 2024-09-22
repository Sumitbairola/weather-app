export const fetchWeatherData = async (lat, lon, unit) => {
  const apiKey = '3e98c8154b85c153a49e18252d5305c4'; 
  
  // Fetch current weather data using latitude and longitude
  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`
  );

  console.log(`Fetching weather for coordinates: ${lat}, ${lon}...`); // Log the lat/lon being fetched

  if (!weatherResponse.ok) {
    throw new Error('Weather data not found for the given location');
  }

  const weather = await weatherResponse.json();
  console.log('Weather Data:', weather); // Log the weather data

  // Fetch 5-day forecast using latitude and longitude
  const forecastResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`
  );

  if (!forecastResponse.ok) {
    throw new Error('Forecast data not found for the given location');
  }

  const forecast = await forecastResponse.json();
  console.log('Forecast Data:', forecast); // Log the forecast data

  return { weather, forecast }; // Return the fetched weather and forecast data
};

  