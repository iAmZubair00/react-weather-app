import React from "react";
import Day from "./Day";
import NavigationIcon from "@mui/icons-material/Navigation";
import { useWeatherData } from "@/contexts/WeatherContext";
import { getRequiredForecast } from "@/utils/utils";

export default function Detail() {

  const { tempScale, setTempScale, weather } = useWeatherData();
  const { visibility, airPressure, forecastData } = weather;

  return (
    <div className="bg-darkBlue px-6% py-6 md:w-70% w-full flex flex-col gap-9">
      <div className="flex gap-3 self-end text-lg">
        {['c', 'f'].map((scale) => (
          <button
            key={scale}
            onClick={() => setTempScale(scale)}
            className={
              "rounded-full w-10 h-10 font-bold " +
              (tempScale === scale
                ? "bg-customWhite text-lessDarkBlue"
                : "bg-bluishGray text-customWhite")
            }
          >
            &deg;{scale.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-dayCards gap-5 text-center">
        {forecastData?.map((dayForecast, index) => (
          <Day
            key={index}
            id={index}
            tempScale={tempScale}
            forecast={getRequiredForecast(dayForecast)}
          />
        ))}
      </div>
      <div className="text-customWhite">
        <p className="mb-4 font-bold text-2xl">Today&apos;s Highlights</p>
        <div className="flex flex-col gap-12 text-center">
          <div className="flex flex-col sm:flex-row gap-12">
            <Wind />
            <Humidity />
          </div>
          <div className="flex flex-col sm:flex-row gap-12">
            <OtherParams
              paramName={"Visibility"}
              paramValue={visibility}
              unit={"miles"}
            />
            <OtherParams
              paramName={"Air Pressure"}
              paramValue={airPressure}
              unit={"mb"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const Wind = () => {
  // get parameters from App WeatherContext using useContext
  const { windDirection, windDirectionAngle, windSpeed } = useWeatherData()?.weather;

  return (
    <div className="bg-lightBlue flex-grow p-12 py-5 sm:w-1/2 flex flex-col justify-between gap-3">
      <p className="font-medium">Wind Status</p>
      <p className="font-bold text-6xl">
        {windSpeed}
        <span className="font-medium text-4xl">mph</span>
      </p>
      <div className="flex justify-center items-center gap-2">
        <div className="bg-darkGrayBorder rounded-full w-5 h-5 p-4 flex justify-center items-center">
          <NavigationIcon
            fontSize="small"
            style={{ transform: `rotate(${windDirectionAngle}deg)` }}
          />
        </div>
        <span className="font-medium text-sm">{windDirection}</span>
      </div>
    </div>
  );
};

const Humidity = () => {
  // get parameters from App WeatherContext using useContext
  const { humidity } = useWeatherData()?.weather;
  return (
    <div className="bg-lightBlue flex-grow p-12 py-5 sm:w-1/2 flex flex-col items-center">
      <p className="font-medium">Humidity</p>
      <p className="my-5 font-bold text-6xl">
        {humidity}
        <span className="font-normal text-4xl">%</span>
      </p>
      <div className="flex justify-between w-full text-xs text-textColor">
        <span className="font-bold text-xs">0</span>
        <span className="font-bold text-xs">50</span>
        <span className="font-bold text-xs">100</span>
      </div>
      <div className="w-full bg-customWhite rounded-full h-2">
        <div
          className="bg-customYellow h-full rounded-full"
          style={{ width: `${humidity}%` }}
        ></div>
      </div>
      <div className="flex justify-end w-full text-xs text-textColor">
        <span className="font-bold text-xs">%</span>
      </div>
    </div>
  );
};

const OtherParams = ({ paramName, paramValue, unit }: { paramName: string, paramValue: number, unit: string }) => {
  return (
    <div className="bg-lightBlue flex-grow sm:w-1/2 p-6 pt-5">
      <p className="font-medium">{paramName}</p>
      <p className="mt-5 text-xl flex justify-center gap-3 items-center">
        <span className="font-bold text-6xl">{paramValue}</span>
        <span className="font-medium text-4xl">{unit}</span>
      </p>
    </div>
  );
};
