import React, { useState } from "react";
import Summary from "./components/Summary";
import Detail from "./components/Detail";
import SearchSideMenu from "./components/SearchSideMenu";
import { getRequiredWeather } from "./utils";
import useFetch from "./services/useFetch";

export const WeatherContext = React.createContext();

function App() {
  const [searchLocation, setSearchLocation] = useState({
    lat: 28.643999,
    long: 77.091003,
  });
  const [searchHistory, setSearchHistory] = useState([]);
  const [tempScale, setTempScale] = useState("c");
  const [searchNeeded, setSearchNeeded] = useState(false);

  const {
    data: weatherData,
    error,
    loading,
    setLoading,
  } = useFetch(searchLocation);

  if (error) throw error;
  if (loading)
    return (
      <div className="flex justify-center items-center text-lg w-screen h-screen">
        <div>Loading Weather Data..........</div>
      </div>
    );

  return (
    <div className="text-textColor flex flex-col md:flex-row min-h-screen max-w-full font-raleway text-base">
      <SearchSideMenu
        searchNeeded={searchNeeded}
        handleSetSearchNeeded={setSearchNeeded}
        handleSetSearchLocation={setSearchLocation}
        handleSetLoading={setLoading}
        searchHistory={searchHistory}
        handleSetSearchHistory={setSearchHistory}
      />
      <WeatherContext.Provider value={getRequiredWeather(weatherData)}>
        <Summary
          searchNeeded={searchNeeded}
          handleSetSearchNeeded={setSearchNeeded}
          handleSetSearchLocation={setSearchLocation}
          handleSetLoading={setLoading}
          tempScale={tempScale}
        />
        <Detail tempScale={tempScale} handleSetTempScale={setTempScale} />
      </WeatherContext.Provider>
    </div>
  );
}

export default App;

/* var currentLocation;
const setCurrentLocation = (loc) => {
  currentLocation = loc;
};

navigator.geolocation.getCurrentPosition((position) => {
  setCurrentLocation({
    lat: position.coords.latitude,
    long: position.coords.longitude,
  });
}); */

/* 
  const findIdByLatLong = useCallback(async ({ lat, long }) => {
    await fetch(
      `https://cors.bridged.cc/https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`,
      apiOptions
    )
      .then((response) => response.json())
      .then((jsonData) => getWeather(jsonData[0].woeid))
      .catch((err) => alert("Wrong Location or Location not available"));
  }, []);

  const getWeather = async (id) => {
    await fetch(
      `https://cors.bridged.cc/https://www.metaweather.com/api/location/${id}`,
      apiOptions
    )
      .then((response) => response.json())
      .then((jsonData) => {
        setWeatherData(jsonData);
      })
      .catch((err) => alert("Wrong Location or Location not available"))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    findIdByLatLong(searchLocation);
  }, [searchLocation, findIdByLatLong]); */
