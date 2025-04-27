import { IForecastItemResp, IWeather, IWeatherResponse } from "../types";

export const isObjectEmpty = (obj: {}) => Object.keys(obj).length === 0 && obj.constructor === Object

export const getCorrectScaledTemp = (scale: string, temp: number) =>
  scale === "c" ? temp : Math.trunc(temp * (9 / 5) + 32);

export const getFormattedDateParts = (date: Date) => {
  if (!date) return {};
  const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  return {
    day: days[date.getDay()],
    date: date.getDate(),
    month: months[date.getMonth()],
  };
};

export const getRequiredWeather = (weatherData: IWeatherResponse, forecast: IForecastItemResp[]): IWeather => {
  if(!weatherData || isObjectEmpty(weatherData)) return {} as IWeather

  // get only daywise Forecast
  const seenDates = new Set();
  const dayWiseForecast = forecast?.filter(item => {
    const dateOnly = item.dt_txt.split(" ")[0]; // extract "YYYY-MM-DD"
    if (!seenDates.has(dateOnly)) {
      seenDates.add(dateOnly);
      return true; // keep this item
    }
    return false; // skip this item
  });

  return {
    dateToday: new Date(weatherData.dt * 1000),
    weatherState: weatherData.weather[0].main,
    temp: Math.trunc(weatherData.main.temp),
    iconPath: weatherData.weather[0].icon,
    location: weatherData.name,
    windDirectionAngle: Math.trunc(
      weatherData.wind.deg
    ),
    ////////////////////////////////////windDirection: weatherData.consolidated_weather[0].wind_direction_compass,
    windDirection: '', // no mapping in current response
    windSpeed: Math.trunc(weatherData.wind.speed),
    visibility: Math.trunc(weatherData.visibility ? weatherData.visibility / 1609.34 : 0),
    humidity: weatherData.main.humidity,
    airPressure: weatherData.main.pressure,
    forecastData: dayWiseForecast,
  };
};

export const getRequiredForecast = (forecast: IForecastItemResp) => {
  return {
    dateToday: new Date(forecast.dt * 1000),
    minTemp: Math.trunc(forecast.main.temp_min),
    maxTemp: Math.trunc(forecast.main.temp_max),
    iconPath: forecast.weather[0].icon,
  };
};
