import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { getRequiredWeather } from "../utils/utils";
import { ILocation, IWeather } from "../types";

interface IWeatherContextProps {
  weather: IWeather,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  searchLocation: ILocation,
  setSearchLocation: React.Dispatch<React.SetStateAction<ILocation>>,
  searchNeeded: boolean, 
  setSearchNeeded: React.Dispatch<React.SetStateAction<boolean>>,
  tempScale: string,
  setTempScale: React.Dispatch<React.SetStateAction<string>>,
}

const WeatherContext = createContext({} as IWeatherContextProps);

const WeatherProvider = ({ children }: PropsWithChildren) => {
  const [searchLocation, setSearchLocation] = useState<ILocation>('');
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

