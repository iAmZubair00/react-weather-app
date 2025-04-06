import React, { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { getRequiredWeather } from "../utils/utils";

const WeatherContext = createContext({});

const WeatherProvider = ({ children }) => {
  const [searchLocation, setSearchLocation] = useState(null);
  const [searchNeeded, setSearchNeeded] = useState(false);
  const [tempScale, setTempScale] = useState("c");

  const {
    data: weatherData,
    forecast,
    loading,
    setLoading,
  } = useFetch(searchLocation);

  const contextValue = {
    weather: getRequiredWeather(weatherData, forecast?.list),
    loading, setLoading,
    searchLocation, setSearchLocation,
    searchNeeded, setSearchNeeded,
    tempScale, setTempScale,
  };

  // set default location to current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setSearchLocation(() => {
        return {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };
      });
    });
  }, []);

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};

const useWeatherData = () => useContext(WeatherContext);

export { WeatherProvider, useWeatherData };

