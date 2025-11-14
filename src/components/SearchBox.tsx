import React, { useState, useRef, useEffect } from "react";
import type { LatLng } from "leaflet";

interface SearchBoxProps {
  onLocationSelect: (latlng: LatLng) => void;
  onError: (message: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onLocationSelect, onError }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<
    { name: string; lat: number; lon: number }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    try {
      const searchUrl = new URL(
        "https://nominatim.openstreetmap.org/search?format=json"
      );
      searchUrl.searchParams.set("q", searchQuery);
      searchUrl.searchParams.set("limit", "1");
      searchUrl.searchParams.set("addressdetails", "1");

      const response = await fetch(searchUrl.toString(), {
        headers: {
          "Accept-Language": "id",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Nominatim gagal merespons: ${response.status} ${errorText}`
        );
      }

      const data: Array<{
        lat: string;
        lon: string;
        display_name?: string;
      }> = await response.json();

      if (data.length === 0) {
        onError("Lokasi tidak ditemukan");
        return;
      }

      const { lat, lon, display_name } = data[0];
      onLocationSelect({
        lat: parseFloat(lat),
        lng: parseFloat(lon),
      } as LatLng);
      setQuery(display_name ?? "");
      setShowSuggestions(false);
    } catch (error) {
      console.error("Search error:", error);
      onError(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mencari lokasi"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch(query);
    }
  };

  const handleSuggestionClick = (suggestion: {
    name: string;
    lat: number;
    lon: number;
  }) => {
    onLocationSelect({
      lat: suggestion.lat,
      lng: suggestion.lon,
    } as LatLng);
    setQuery(suggestion.name);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchBoxRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari alamat, kota, atau tempat..."
            className="w-full px-3 py-2 md:px-4 md:py-3 pl-10 md:pl-12 pr-10 md:pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm bg-slate-50/80 text-sm md:text-base"
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 md:h-5 md:w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {isLoading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg
                className="animate-spin h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          disabled={isLoading}
        >
          <span className="sr-only">Cari</span>
        </button>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md overflow-hidden">
          <ul className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center">
                  <span className="font-normal block truncate">
                    {suggestion.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
