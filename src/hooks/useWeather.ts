
import { useEffect, useState } from "react";

import { getWeather } from "../services/weather";
import type { OpenMeteoResponse } from "../types/weather";

export function useWeather(
  latitude: number | null,
  longitude: number | null,
) {
  const [weather, setWeather] = useState<OpenMeteoResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  function refetch() {
    setRetryCount((current) => current + 1);
  }

  useEffect(() => {
    if (latitude === null || longitude === null) {
      setWeather(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    const lat: number = latitude;
    const lon: number = longitude;

    let isActive = true;

    async function fetchWeather() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getWeather(lat, lon);

        if (isActive) {
          setWeather(data);
        }
      } catch (err) {
        if (isActive) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to fetch weather data.",
          );
          setWeather(null);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    fetchWeather();

    return () => {
      isActive = false;
    };
  }, [latitude, longitude, retryCount]);

  return {
    weather,
    isLoading,
    error,
    refetch,
  };
}
