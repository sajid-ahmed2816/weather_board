import { useEffect, useState } from "react";
import type { City } from "../types/city";

const STORAGE_KEY = "weatherboard-favorites";
const MAX_FAVORITES = 5;

function getInitialFavorites(): City[] {
  try {
    const savedFavorites = localStorage.getItem(STORAGE_KEY);

    if (!savedFavorites) return [];

    const parsedFavorites: unknown = JSON.parse(savedFavorites);

    if (Array.isArray(parsedFavorites)) {
      return parsedFavorites.slice(0, MAX_FAVORITES) as City[];
    }

    return [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<City[]>(
    getInitialFavorites,
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites),
      );
    } catch {
      // Favorites still work during the current session
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
  };
}