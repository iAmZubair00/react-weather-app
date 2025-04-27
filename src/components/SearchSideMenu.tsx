import React, { useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useWeatherData } from "../contexts/WeatherContext";

export default function SearchSideMenu() {
  
  const { searchNeeded, setSearchNeeded, setSearchLocation, setLoading } = useWeatherData();
  const searchInput = useRef<HTMLInputElement>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  return (
    <div
      className={
        "bg-lightBlue text-customWhite md:w-30% w-full px-6 py-4 flex-col gap-8 " +
        (searchNeeded ? "flex" : "hidden")
      }
    >
      <div
        className="flex justify-end"
        onClick={() => setSearchNeeded(false)}
      >
        <CloseIcon sx={{ fontSize: 30 }} className="cursor-pointer" />
      </div>
      <div className="flex flex-row md:flex-col xl:flex-row justify-between gap-2">
        <label className="relative flex-grow-3">
          <SearchIcon className="pointer-events-none absolute top-2 left-2 text-darkGrayBorder" />
          <input
            type="text"
            placeholder="search location"
            ref={searchInput}
            className="bg-transparent w-full py-2 pl-9 border border-customWhite placeholder-darkGrayBorder outline-none"
          />
        </label>
        <button
          className="bg-blueBG p-2 font-semibold flex-grow"
          onClick={() => {
            setSearchHistory((prev) => [
              ...prev,
              searchInput?.current?.value!,
            ]);
            setSearchLocation(searchInput?.current?.value!);
            setSearchNeeded(false);
            setLoading(true);
          }}
        >
          Search
        </button>
      </div>
      <div>
        <ul className="font-medium">
          {searchHistory.map((item, i) => (
            <li
              className="hover:border hover:border-darkGrayBorder p-2 cursor-pointer mb-3"
              key={i}
              onClick={() => {
                setSearchLocation(item);
                setLoading(true);
                setSearchNeeded(false);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
