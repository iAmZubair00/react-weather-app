import React from "react";

export default function OtherParams({ paramName, paramValue, unit }) {
  return (
    <div className="bg-lightBlue flex-grow w-1/2 p-6 pt-5">
      <p className="font-medium">{paramName}</p>
      <p className="mt-5 text-xl flex justify-center gap-3 items-center">
        <span className="font-bold text-6xl">{paramValue}</span>
        <span className="font-medium text-4xl">{unit}</span>
      </p>
    </div>
  );
}
