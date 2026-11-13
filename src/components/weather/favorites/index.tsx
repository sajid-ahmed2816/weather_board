import { MapPin, Star, Trash2 } from "lucide-react";
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
    <section className="mt-8">
      <div className="mb-4 flex items-center gap-2">
        <Star size={19} className="text-(--accent)" />
        <h3 className="text-lg font-semibold text-(--text)">
          Favorite Cities
        </h3>
        <span className="text-sm text-(--muted)">
          ({favorites.length}/5)
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-(--border) bg-(--surface) px-5 py-8 text-center">
          <p className="text-sm text-(--muted)">
            No favorite cities yet. Add a city to access it quickly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {favorites.map((city) => {
            const isSelected = city.id === selectedCityId;

            return (
              <div
                key={city.id}
                className={`flex items-center justify-between gap-3 rounded-2xl border p-4 transition-colors ${isSelected
                  ? "border-(--accent) bg-(--surface-hover)"
                  : "border-(--border) bg-(--surface)"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => onCitySelect(city)}
                  className="flex min-w-0 flex-1 items-center gap-3 text-left"
                >
                  <MapPin
                    size={19}
                    className="shrink-0 text-(--accent)"
                  />

                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-(--text)">
                      {city.city}
                    </span>
                    <span className="block truncate text-xs text-(--muted)">
                      {city.country}
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRemove(city)}
                  aria-label={`Remove ${city.city} from favorites`}
                  title="Remove from favorites"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-(--muted) transition-colors hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}