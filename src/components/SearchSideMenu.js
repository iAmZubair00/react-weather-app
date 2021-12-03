import React, { useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchSideMenu({
  handleSetSearchLocation,
  handleSetLoading,
  searchHistory,
  handleSetSearchHistory,
  searchNeeded,
  handleSetSearchNeeded,
}) {
  const searchInput = useRef(null);

  const getLatLong = async (location) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search/?city=${location}&format=json`
    );
    const data = await response.json();
    return { lat: data[0].lat, long: data[0].lon };
  };

  return (
    <div
      className={
        "bg-lightBlue text-customWhite md:w-30% w-full px-6 py-4 flex-col gap-8 " +
        (searchNeeded ? "flex" : "hidden")
      }
    >
      <div
        className="flex justify-end"
        onClick={() => handleSetSearchNeeded(false)}
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
          onClick={async () => {
            handleSetSearchHistory((prev) => [
              ...prev,
              searchInput.current.value,
            ]);
            const latLong = await getLatLong(searchInput.current.value);
            handleSetSearchLocation(latLong);
            handleSetSearchNeeded(false);
            handleSetLoading(true);
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
              onClick={async () => {
                const latLong = await getLatLong(item);
                handleSetSearchLocation(latLong);
                handleSetLoading(true);
                handleSetSearchNeeded(false);
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
