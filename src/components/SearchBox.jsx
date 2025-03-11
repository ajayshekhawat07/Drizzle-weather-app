/* eslint-disable react/prop-types */

import { useContext, useEffect, useRef, useState } from "react";
import { LocationContext } from "../App";
import useLocation from "@/hooks/useLocation";
import { MapPin } from "lucide-react";
import { cn } from "@/utils/cn";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { setLocation } = useContext(LocationContext);
  const inputRef = useRef(null);

  const { data, error, isLoading } = useLocation(query);

  //handel form submission
  const handleSearch = async (event) => {
    event.preventDefault();
  };

  //handle is selected location valid or not
  function isLocationValid(latitude, longitude) {
    const isLatitudeValid =
      typeof latitude === "number" && !Number.isInteger(latitude);
    const isLongitudeValid =
      typeof longitude === "number" && !Number.isInteger(longitude);

    return isLatitudeValid && isLongitudeValid;
  }

  //handle what user type in input form
  const handleInputChange = async (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.length >= 2) {
      if (data?.results) {
        const searchResults = await data;
        const validSearchResults = await searchResults?.results.filter(
          (result) => isLocationValid(result.latitude, result.longitude),
        );
        setResults(validSearchResults);
      }
    } else {
      setResults([]);
    }
  };

  //handle selected location by user
  function handleSelectLocation(selectedLocation) {
    setLocation(selectedLocation);
    setQuery("");
    setResults([]);
  }

  //Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-center gap-2"
      ref={inputRef}
    >
      <form onSubmit={handleSearch}>
        <label className="input bg-neutral my-4 w-3xs border-none sm:w-md">
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
          )}
          <input
            type="search"
            required
            value={query}
            placeholder="Search city..."
            onChange={handleInputChange}
          />
        </label>
      </form>
      {results.length > 0 && (
        <div
          className={cn(
            "bg-base-200 absolute top-full z-50 max-h-60 w-3xs rounded sm:w-md",
            results.length >= 4 && "scrollbar-thin overflow-y-auto",
          )}
        >
          <ul className="divide-y-1">
            {results.map((location) => (
              <li
                key={location.id}
                onClick={() => handleSelectLocation(location)}
                className="cursor-pointer"
              >
                <div className="flex items-start gap-2 p-2">
                  <div>
                    <MapPin />
                  </div>
                  <div className="">
                    <p className="text-sm font-medium text-white">
                      {location.name}
                    </p>
                    <p className="text-sm font-normal text-slate-500">
                      {location.admin1} {location.country}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && (
        <div className="absolute top-full z-50 text-center">
          <p className="text-sm text-red-500">Something went wrong!</p>
        </div>
      )}
    </div>
  );
}
