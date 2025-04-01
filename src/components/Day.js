import React from "react";
import { getCorrectScaledTemp } from "../utils";

export default function Day({
  forecast: { maxTemp, minTemp, iconPath, dateToday: date },
  id,
  tempScale,
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

  const finalDate = {
    day: days[date.getDay()],
    date: date.getDate(),
    month: months[date.getMonth()],
  };

  const correctScaleTemps = {
    max: getCorrectScaledTemp(tempScale, maxTemp),
    min: getCorrectScaledTemp(tempScale, minTemp),
  };

  return (
    <div className="bg-lightBlue p-4 font-medium">
      <p className="text-customWhite">
        {id === 0
          ? "Tomorrow"
          : [`${finalDate.day},`, finalDate.date, finalDate.month].join(" ")}
      </p>
      <div className="flex justify-center mt-2 mb-5">
        <img
          alt="weatherIcon"
          src={`https://openweathermap.org/img/wn/${iconPath}@2x.png`}
          className="w-14 h-16"
        ></img>
      </div>
      <div className="flex justify-between">
        <p className="text-customWhite">
          <span>{correctScaleTemps.max}</span>
          <span>&deg;{tempScale === "c" ? "C" : "F"}</span>
        </p>
        <p>
          <span>{correctScaleTemps.min}</span>
          <span>&deg;{tempScale === "c" ? "C" : "F"}</span>
        </p>
      </div>
    </div>
  );
}
