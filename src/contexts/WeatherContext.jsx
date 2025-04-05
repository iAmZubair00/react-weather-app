import React, { createContext, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { getRequiredWeather } from "../utils/utils";

const WeatherContext = createContext({});

const WeatherProvider = ({ children }) => {
  const [searchLocation, setSearchLocation] = useState("lahore");
  const [searchNeeded, setSearchNeeded] = useState(false);
  const [tempScale, setTempScale] = useState("c");

  const {
    data: weatherData,
    forecast,
    loading,
    error,
    setLoading,
  } = useFetch(searchLocation);

  const contextValue = {
    weather: getRequiredWeather(weatherData, forecast?.list),
    loading,
    setLoading,
    error,
    searchLocation,
    setSearchLocation,
    searchNeeded,
    setSearchNeeded,
    tempScale,
    setTempScale,
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};

const useWeatherData = () => useContext(WeatherContext);

export { WeatherProvider, useWeatherData };

