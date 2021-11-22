import React from "react";

export default function Humidity({ humidity }) {
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
}
