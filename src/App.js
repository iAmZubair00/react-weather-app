import Summary from "./components/Summary";
import Detail from "./components/Detail";
import SearchSideMenu from "./components/SearchSideMenu";
import { useState, useEffect } from "react";
import { getCurrentLocation } from "./utils";

const CORS_BRIDGE_API_KEY = "98962845-3242-4056-bec2-0d078e520371";
const apiOptions = {
  headers: {
    "x-cors-grida-api-key": CORS_BRIDGE_API_KEY,
  },
};

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [searchLocation, setSearchLocation] = useState(getCurrentLocation());
  const [searchHistory, setSearchHistory] = useState(["Lahore"]);
  const [loading, setLoading] = useState(true);
  const [tempScale, setTempScale] = useState("c");
  const [searchNeeded, setSearchNeeded] = useState(false);

  const findIdByLatLong = async ({ lat, long }) => {
    await fetch(
      `https://cors.bridged.cc/https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`,
      apiOptions
    )
      .then((response) => response.json())
      .then((jsonData) => getWeather(jsonData[0].woeid))
      .catch((err) => alert("Wrong Location or Location not available"));
  };

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
  }, [searchLocation]);

  if (loading) return <>Loading data</>;

  return (
    <div className="text-textColor flex flex-col md:flex-row min-h-screen max-w-full font-raleway text-base">
      <Summary
        searchNeeded={searchNeeded}
        handleSetSearchNeeded={setSearchNeeded}
        handleSetSearchLocation={setSearchLocation}
        handleSetLoading={setLoading}
        tempScale={tempScale}
        dateToday={weatherData.consolidated_weather[0].applicable_date}
        weatherState={weatherData.consolidated_weather[0].weather_state_name}
        temp={Math.trunc(weatherData.consolidated_weather[0].the_temp)}
        iconPath={weatherData.consolidated_weather[0].weather_state_abbr}
        location={weatherData.title}
      />
      <SearchSideMenu
        searchNeeded={searchNeeded}
        handleSetSearchNeeded={setSearchNeeded}
        handleSetSearchLocation={setSearchLocation}
        handleSetLoading={setLoading}
        searchHistory={searchHistory}
        handleSetSearchHistory={setSearchHistory}
      />
      <Detail
        windDirection={
          weatherData.consolidated_weather[0].wind_direction_compass
        }
        windSpeed={Math.trunc(weatherData.consolidated_weather[0].wind_speed)}
        visibility={Math.trunc(weatherData.consolidated_weather[0].visibility)}
        humidity={weatherData.consolidated_weather[0].humidity}
        airPressure={weatherData.consolidated_weather[0].air_pressure}
        forecastData={weatherData.consolidated_weather.slice(1)}
        tempScale={tempScale}
        handleSetTempScale={setTempScale}
      />
    </div>
  );
}

export default App;
