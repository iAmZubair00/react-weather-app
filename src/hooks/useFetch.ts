import { useEffect, useState } from "react";
import { getForecast, getForecastByCords, getWeather, getWeatherByCords } from "../api";
import { IForecastResponse, ILocation, IWeatherResponse } from "../types";

const useFetch = (location: ILocation) => {
  const [data, setData] = useState<IWeatherResponse>({} as IWeatherResponse);
  const [forecast, setForecast] = useState<IForecastResponse>({} as IForecastResponse);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    try{
      const weather = typeof location === 'string' ? await getWeather(location) : await getWeatherByCords(location.lat, location.long)
      setData(weather)    
    }catch(err){
      setError(err)
    }finally{
      setLoading(false)
    } 
  }

  const fetchForecast = async () => {
    try{
      const forecastData = typeof location === 'string' ? await getForecast(location) : await getForecastByCords(location.lat, location.long)
      setForecast(forecastData)    
    }catch(err){
      setError(err)
    }finally{
      setLoading(false)
    } 
  }

  useEffect(() => {
    if(location){
      fetchWeather()
      fetchForecast()
    } 
  }, [location]);
  return { data, forecast, error, loading, setLoading };
};

export default useFetch;
