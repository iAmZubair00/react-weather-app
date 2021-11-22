import React from "react";
import { getCorrectScaledTemp } from "../utils";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

export default function Summary({
  tempScale,
  dateToday,
  weatherState,
  temp,
  iconPath,
  location,
  searchNeeded,
  handleSetSearchNeeded,
  handleSetSearchLocation,
  handleSetLoading,
}) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateArr = dateToday.split("-");
  const date = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);

  const finalDate = {
    day: days[date.getDay()],
    date: date.getDate(),
    month: months[date.getMonth()],
  };

  const correctTemp = getCorrectScaledTemp(tempScale, temp);

  return (
    <div
      className={
        "bg-lightBlue text-center flex-grow flex-col md:w-30% w-full " +
        (searchNeeded ? "hidden" : "flex")
      }
    >
      <div className="p-6 flex flex-row md:flex-col md:gap-4 lg:gap-0 lg:flex-row justify-between items-center text-customWhite">
        <button
          className="bg-grayBG font-medium px-4 py-2 min-w-136px"
          onClick={() => handleSetSearchNeeded(true)}
        >
          Search for Places
        </button>
        <div
          data-content="Find Current Location weather"
          className="w-10 h-10 p-2 bg-grayBG flex justify-center items-center rounded-full cursor-pointer group "
        >
          <GpsFixedIcon
            sx={{ fontSize: 22 }}
            onClick={() => {
              navigator.geolocation.getCurrentPosition((position) => {
                handleSetSearchLocation(() => {
                  return {
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                  };
                });
              });
              handleSetLoading(true);
            }}
          />
          <div className="group-hover:flex flex-wrap hidden absolute top-20 md:top-32 lg:top-20 px-2 py-1 justify-center items-center rounded-sm text-xs font-bold bg-white text-black z-50">
            Find Current Location's Weather
          </div>
        </div>
      </div>
      <div className="flex-grow flex justify-center bg-cloudsBG bg-contain bg-no-repeat relative before:absolute before:w-full before:h-full before:bg-lightBlue before:opacity-90">
        <img
          alt="weatherIcon"
          src={`https://www.metaweather.com/static/img/weather/${iconPath}.svg`}
          className="w-40 h-48 z-10"
        ></img>
      </div>
      <div className="flex-grow flex flex-col justify-between py-5">
        <div>
          <p className="font-medium">
            <span className="text-customWhite text-9xl">{correctTemp}</span>
            <span className="text-5xl">
              &deg;{tempScale === "c" ? "C" : "F"}
            </span>
          </p>
          <p className="my-10 font-semibold text-4xl">{weatherState}</p>
        </div>
        <div>
          <p className="mb-3 font-medium text-lg">
            Today :{" "}
            <span>
              {[`${finalDate.day},`, finalDate.date, finalDate.month].join(" ")}
            </span>
          </p>
          <p className="flex justify-center items-center">
            <LocationOnIcon className="w-4 h-5" />
            <span className="font-semibold text-lg">{location}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
