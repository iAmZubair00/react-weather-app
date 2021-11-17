import React from "react";

export default function Wind() {
  return (
    <div className="bg-lightBlue flex-grow p-12 py-5 w-1/2 flex flex-col justify-between">
      <p className="font-medium">Wind Status</p>
      <p className="font-bold text-6xl">
        7<span className="font-medium text-4xl">mph</span>
      </p>
      <p>
        <i></i>
        <span className="font-medium text-sm">WSW</span>
      </p>
    </div>
  );
}
