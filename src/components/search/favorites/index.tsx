
import { MapPin, Star, X } from "lucide-react";
import type { City } from "../../../types/city";

interface FavoritesProps {
  favorites: City[];
  selectedCityId: number | null;
  onCitySelect: (city: City) => void;
  onRemove: (cityId: number) => void;
}

export default function Favorites({
  favorites,
  selectedCityId,
  onCitySelect,
  onRemove,
}: FavoritesProps) {
  function handleRemove(city: City) {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${city.city} from favorites?`,
    );

    if (confirmed) {
      onRemove(city.id);
    }
  }

  return (
    <div className="mt-4 mx-auto max-w-3xl">
      <div className="mb-3 flex items-center gap-2">
        <Star size={16} className="text-(--accent)" />

        <h3 className="text-sm font-semibold text-(--text)">
          Favorites
        </h3>

        <span className="text-xs text-(--muted)">
          {favorites.length}/5
        </span>
      </div>

      {favorites.length === 0 ? (
        <p className="text-xs text-(--muted)">
          No favorites yet. Add a city using the heart icon.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {favorites.map((city) => {
            const isSelected = city.id === selectedCityId;

            return (
              <div
                key={city.id}
                className={`flex min-w-0 items-center justify-between gap-1 rounded-full border py-1 pl-3 pr-1 transition-colors ${isSelected
                  ? "border-(--accent) bg-(--surface-hover)"
                  : "border-(--border) bg-(--surface)"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => onCitySelect(city)}
                  aria-label={`Show weather for ${city.city}`}
                  title={`${city.city}, ${city.country}`}
                  className="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden text-left text-sm font-medium text-(--text)"
                >
                  <MapPin
                    size={14}
                    className="shrink-0 text-(--accent)"
                  />
                  <span className="truncate">{city.city}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRemove(city)}
                  aria-label={`Remove ${city.city} from favorites`}
                  title="Remove favorite"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-(--muted) transition-colors hover:bg-red-500/10 hover:text-red-400"
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
