import { useEffect, useState } from "react";
import type { City } from "../types/city";

const STORAGE_KEY = "weatherboard-favorites";
const MAX_FAVORITES = 5;

interface FavoritesStorageState {
  favorites: City[];
  storageAvailable: boolean;
}

function getInitialFavorites(): FavoritesStorageState {
  try {
    const savedFavorites = localStorage.getItem(STORAGE_KEY);

    if (!savedFavorites) {
      return { favorites: [], storageAvailable: true };
    }

    const parsedFavorites: unknown = JSON.parse(savedFavorites);

    if (Array.isArray(parsedFavorites)) {
      return {
        favorites: parsedFavorites.slice(0, MAX_FAVORITES) as City[],
        storageAvailable: true,
      };
    }

    return { favorites: [], storageAvailable: true };
  } catch {
    return { favorites: [], storageAvailable: false };
  }
}

export function useFavorites() {
  const [initialState] = useState(getInitialFavorites);
  const [favorites, setFavorites] = useState<City[]>(
    initialState.favorites,
  );
  const [isStorageAvailable, setIsStorageAvailable] = useState(
    initialState.storageAvailable,
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites),
      );
      setIsStorageAvailable(true);
    } catch {
      setIsStorageAvailable(false);
    }
  }, [favorites]);

  function addFavorite(city: City) {
    setFavorites((currentFavorites) => {
      if (currentFavorites.some((item) => item.id === city.id)) {
        return currentFavorites;
      }

      if (currentFavorites.length >= MAX_FAVORITES) {
        return currentFavorites;
      }

      return [...currentFavorites, city];
    });
  }

  function removeFavorite(cityId: number) {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((city) => city.id !== cityId),
    );
  }

  function isFavorite(cityId: number) {
    return favorites.some((city) => city.id === cityId);
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    maxFavorites: MAX_FAVORITES,
    isStorageAvailable,
  };
}
