import React from "react";
import Day from "./Day";
import Humidity from "./Humidity";
import OtherParams from "./OtherParams";
import Wind from "./Wind";

export default function Detail({
  windDirection,
  windSpeed,
  visibility,
  humidity,
  airPressure,
  forecastData,
  tempScale,
  handleSetTempScale,
}) {
  return (
    <div className="bg-darkBlue px-6% py-6 md:w-70% w-full flex flex-col gap-9">
      <div className="flex gap-3 self-end text-lg">
        <button
          onClick={() => handleSetTempScale("c")}
          className={
            "rounded-full w-10 h-10 font-bold " +
            (tempScale === "c"
              ? "bg-customWhite text-lessDarkBlue"
              : "bg-bluishGray text-customWhite")
          }
        >
          &deg;C
        </button>
        <button
          onClick={() => handleSetTempScale("f")}
          className={
            "rounded-full w-10 h-10 font-bold " +
            (tempScale === "f"
              ? "bg-customWhite text-lessDarkBlue"
              : "bg-bluishGray text-customWhite")
          }
        >
          &deg;F
        </button>
      </div>
      <div className="grid grid-cols-dayCards gap-5 text-center">
        {forecastData.map(
          (
            { max_temp, min_temp, weather_state_abbr, applicable_date },
            index
          ) => (
            <Day
              key={index}
              id={index}
              tempScale={tempScale}
              dateToday={applicable_date}
              minTemp={Math.trunc(min_temp)}
              maxTemp={Math.trunc(max_temp)}
              iconPath={weather_state_abbr}
            />
          )
        )}
      </div>
      <div className="text-customWhite">
        <p className="mb-4 font-bold text-2xl">Today's Highlights</p>
        <div className="flex flex-col gap-12 text-center">
          <div className="flex flex-col sm:flex-row gap-12">
            <Wind windSpeed={windSpeed} windDirection={windDirection} />
            <Humidity humidity={humidity} />
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

/* 
const tempScaleBtn = ({ scale, scaleState, setScaleState }) => {
  return (
    <button
      onClick={() => setScaleState(scale)}
      className={
        "rounded-full w-10 h-10 font-bold " +
        (scaleState === scale
          ? "bg-customWhite text-lessDarkBlue"
          : "bg-bluishGray text-customWhite")
      }
    >
      &deg;{scale.toUpperCase()}
    </button>
  );
}; */
