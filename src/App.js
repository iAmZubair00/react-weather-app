import React, { useState } from "react";
import Summary from "./components/Summary";
import Detail from "./components/Detail";
import SearchSideMenu from "./components/SearchSideMenu";
import { getRequiredWeather } from "./utils";
import useFetch from "./services/useFetch";

export const WeatherContext = React.createContext();

function App() {
  const [searchLocation, setSearchLocation] = useState('lahore');
  const [searchHistory, setSearchHistory] = useState([]);
  const [tempScale, setTempScale] = useState("c");
  const [searchNeeded, setSearchNeeded] = useState(false);

  const {
    data: weatherData,
    forecast,
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
      <WeatherContext.Provider value={getRequiredWeather(weatherData, forecast?.list)}>
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