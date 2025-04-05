import React from "react";
import Summary from "./components/Summary";
import Detail from "./components/Detail";
import SearchSideMenu from "./components/SearchSideMenu";
import { useWeatherData, WeatherProvider } from "./contexts/WeatherContext";

export const WeatherContext = React.createContext();

function App() {

  const { error, loading } = useWeatherData();
  if (error) throw error;
  if (loading)
    return (
      <div className="flex justify-center items-center text-lg w-screen h-screen">
        <div>Loading Weather Data..........</div>
      </div>
    );

  return (
    <div className="text-textColor flex flex-col md:flex-row min-h-screen max-w-full font-raleway text-base">
      <WeatherProvider>
        <SearchSideMenu />
        <Summary />
        <Detail />
      </WeatherProvider>
    </div>
  );
}

export default App;