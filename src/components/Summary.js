import React from "react";
import { getCorrectScaledTemp } from "../utils";

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
      <div className="p-6 flex flex-col lg:flex-row justify-between items-center text-customWhite">
        <button
          className="bg-grayBG font-medium px-4 py-2 min-w-136px"
          onClick={() => handleSetSearchNeeded(true)}
        >
          Search for Places
        </button>
        <i
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
        >
          my location
        </i>
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
          <p>
            <i></i>
            <span className="font-semibold text-lg">{location}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
