
import { useEffect, useState, useRef, type SyntheticEvent, } from "react";
import { MapPin, Search } from "lucide-react";

import { useDebounce } from "../../hooks/useDebounce";
import { searchCities } from "../../services/geocoding";
import type { City } from "../../types/city";
import CityDropdown from "./city_dropdown";

interface CitySearchProps {
  onCitySelect: (city: City) => void;
}

export default function CitySearch({ onCitySelect }: CitySearchProps) {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const skipNextSearchRef = useRef(false);

  // Wait 300ms after the user stops typing.
  const debouncedQuery = useDebounce(query, 300);

  // Fetch matching cities from GeoDB.
  useEffect(() => {
    if (skipNextSearchRef.current) {
      skipNextSearchRef.current = false;
      return;
    }

    const trimmedQuery = debouncedQuery.trim();

    if (trimmedQuery.length < 2) {
      setCities([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchCities() {
      setIsLoading(true);
      setError(null);

      try {
        const results = await searchCities(
          trimmedQuery,
          controller.signal,
        );

        setCities(results);
      } catch (err) {
        if (controller.signal.aborted) return;

        setCities([]);
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while searching cities.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchCities();

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  // Show loading while the debounce timer is running too.
  const isSearching =
    isLoading ||
    (query.trim().length >= 2 &&
      query.trim() !== debouncedQuery.trim());

  function handleSelect(city: City) {
    skipNextSearchRef.current = true;

    setQuery(`${city.city}, ${city.country}`);
    setCities([]);
    setIsOpen(false);
    setIsLoading(false);
    setValidationError(null);

    onCitySelect(city);
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!query.trim()) {
      setValidationError("Please enter a city name.");
      return;
    }

    if (cities.length === 1 && !isSearching) {
      handleSelect(cities[0]);
      return;
    }

    setValidationError("Please select a city from the suggestions.");
    setIsOpen(true);
  }

  function handleBlur() {
    if (!query.trim()) {
      setValidationError("Please enter a city name.");
    }
  }

  function handleChange(value: string) {
    setQuery(value);
    setValidationError(null);
    setIsOpen(true);
  }

  return (
    <div className="mx-auto mt-8 max-w-3xl">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center gap-3 rounded-3xl border border-(--border) bg-(--surface) p-2 shadow-lg"
      >
        <MapPin
          size={16}
          className="ml-3 shrink-0 text-(--muted)"
        />

        <input
          type="text"
          value={query}
          onChange={(event) => handleChange(event.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={handleBlur}
          placeholder="Search for a city..."
          aria-label="Search for a city"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          className="min-w-0 flex-1 bg-transparent py-3 text-sm text-(--text) outline-none placeholder:text-(--muted)"
        />

        <Search
          size={20}
          className="mr-3 shrink-0 text-(--muted)"
        />

        {isOpen && query.trim().length >= 2 && (
          <CityDropdown
            cities={cities}
            isLoading={isSearching}
            error={error}
            query={query}
            onSelect={handleSelect}
          />
        )}
      </form>

      {validationError && (
        <p className="mt-2 px-2 text-left text-xs text-red-400">
          {validationError}
        </p>
      )}
    </div>
  );
}
