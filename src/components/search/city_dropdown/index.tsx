
import { MapPin } from "lucide-react";
import type { City } from "../../../types/city";

interface CityDropdownProps {
  cities: City[];
  isLoading: boolean;
  error: string | null;
  query: string;
  onSelect: (city: City) => void;
}

export default function CityDropdown({
  cities,
  isLoading,
  error,
  query,
  onSelect,
}: CityDropdownProps) {
  if (!query.trim()) {
    return null;
  }

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-(--border) bg-(--surface) shadow-xl">
      {isLoading && (
        <div className="px-4 py-5 text-center text-sm text-(--muted)">
          Searching cities...
        </div>
      )}

      {!isLoading && error && (
        <div className="px-4 py-5 text-center text-sm text-red-400">
          {error}
        </div>
      )}

      {!isLoading && !error && cities.length === 0 && (
        <div className="px-4 py-5 text-center text-sm text-(--muted)">
          No cities found for "{query}"
        </div>
      )}

      {!isLoading && !error && cities.length > 0 && (
        <ul className="max-h-72 overflow-y-auto py-2">
          {cities.map((city) => (
            <li key={city.id}>
              <button
                type="button"
                onClick={() => onSelect(city)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-(--surface-hover)"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--surface-hover) text-(--accent)">
                  <MapPin size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-(--text)">
                    {city.city}
                  </p>

                  <p className="truncate text-xs text-(--muted)">
                    {city.region}, {city.country}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
