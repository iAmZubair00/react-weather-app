export const getCorrectScaledTemp = (scale, temp) =>
  scale === "c" ? temp : Math.trunc(temp * (9 / 5) + 32);

export const fetcher = (url) => fetch(url).then((res) => res.json());

export const getRequiredWeather = (weatherData) => {
  return {
    dateToday: weatherData.consolidated_weather[0].applicable_date,
    weatherState: weatherData.consolidated_weather[0].weather_state_name,
    temp: Math.trunc(weatherData.consolidated_weather[0].the_temp),
    iconPath: weatherData.consolidated_weather[0].weather_state_abbr,
    location: weatherData.title,
    windDirectionAngle: Math.trunc(
      weatherData.consolidated_weather[0].wind_direction
    ),
    windDirection: weatherData.consolidated_weather[0].wind_direction_compass,
    windSpeed: Math.trunc(weatherData.consolidated_weather[0].wind_speed),
    visibility: Math.trunc(weatherData.consolidated_weather[0].visibility),
    humidity: weatherData.consolidated_weather[0].humidity,
    airPressure: weatherData.consolidated_weather[0].air_pressure,
    forecastData: weatherData.consolidated_weather.slice(1),
  };
};

export const getRequiredForecast = (forecast) => {
  return {
    dateToday: forecast.applicable_date,
    minTemp: Math.trunc(forecast.min_temp),
    maxTemp: Math.trunc(forecast.max_temp),
    iconPath: forecast.weather_state_abbr,
  };
};
