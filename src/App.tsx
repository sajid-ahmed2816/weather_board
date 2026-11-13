
import { useState, useEffect } from "react";
import {
  Cloud,
  MapPin,
  Droplets,
  Wind,
  Thermometer,
  Heart,
} from "lucide-react";

import Header from "./components/layout/header";
import CitySearch from "./components/search";
import Forecast from "./components/weather/forecast";
import Favorites from "./components/search/favorites";
import WeatherAnimation from "./components/weather_animation";
import Skeleton from "./components/weather/skeleton";
import { ThemeProvider } from "./context/ThemeContext";
import { TemperatureProvider, useTemperature } from "./context/TemperatureContext";
import { useWeather } from "./hooks/useWeather";
import { useFavorites } from "./hooks/useFavorites";
import { useOnlineStatus } from "./hooks/useOnlineStatus";
import { getWeatherCondition, getWeatherIcon } from "./utils/weather";
import type { City } from "./types/city";

function Dashboard() {
  const [selectedCity, setSelectedCity] = useState<City | null>(() => {
    try {
      const savedCity = localStorage.getItem("weatherboard-last-city");

      return savedCity ? (JSON.parse(savedCity) as City) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (selectedCity) {
        localStorage.setItem(
          "weatherboard-last-city",
          JSON.stringify(selectedCity),
        );
      }
    } catch {
      // Last selected city still works during the current session
    }
  }, [selectedCity]);

  const isOnline = useOnlineStatus();

  const {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    maxFavorites,
  } = useFavorites();

  const {
    unit,
    toggleUnit,
    convertTemperature
  } = useTemperature();

  const {
    weather,
    isLoading,
    error,
    refetch
  } = useWeather(
    selectedCity?.latitude ?? null,
    selectedCity?.longitude ?? null,
  );

  return (
    <div className="min-h-screen bg-(--bg)">
      <Header />

      {!isOnline && (
        <div
          role="status"
          className="bg-red-500 px-4 py-3 text-center text-sm font-medium text-white"
        >
          You are currently offline. Showing available cached data.
        </div>
      )}

      <main className="mx-auto max-w-360 px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <section className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-sm text-(--muted)">
            <Cloud size={16} className="text-(--accent)" />
            Weather at a glance
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-(--text) sm:text-4xl lg:text-5xl">
            Your world,{" "}
            <span className="text-(--accent)">in weather.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-(--muted) sm:text-base">
            Stay ahead of the weather. Search any city to explore current
            conditions and upcoming forecasts.
          </p>

          <CitySearch onCitySelect={setSelectedCity} />

          <Favorites
            favorites={favorites}
            selectedCityId={selectedCity?.id ?? null}
            onCitySelect={setSelectedCity}
            onRemove={removeFavorite}
          />
        </section>


        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-(--text)">
              Weather Overview
            </h3>

            <button
              type="button"
              onClick={toggleUnit}
              className="rounded-xl border border-(--border) bg-(--surface) px-4 py-2 text-sm font-semibold text-(--text) transition-colors hover:bg-(--surface-hover)"
            >
              {unit === "celsius" ? "°C → °F" : "°F → °C"}
            </button>
          </div>

          {!selectedCity && (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-(--border) bg-(--surface) px-5 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-(--surface-hover)">
                <MapPin size={26} className="text-(--accent)" />
              </div>

              <h4 className="font-semibold text-(--text)">
                No city selected
              </h4>

              <p className="mt-2 max-w-sm text-sm leading-6 text-(--muted)">
                Search for a city above to see its current weather and 5-day
                forecast.
              </p>
            </div>
          )}

          {selectedCity && (
            <div className="rounded-3xl border border-(--border) bg-(--surface) p-6 sm:p-8">
              <div className="mb-5">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-(--muted)">
                      <MapPin size={16} />
                      {selectedCity.region}, {selectedCity.country}
                    </div>

                    <h4 className="mt-2 text-2xl font-bold text-(--text)">
                      {selectedCity.city}
                    </h4>
                  </div>


                  <button
                    type="button"
                    onClick={() => addFavorite(selectedCity)}
                    disabled={
                      isFavorite(selectedCity.id) ||
                      favorites.length >= maxFavorites
                    }
                    aria-label={
                      isFavorite(selectedCity.id)
                        ? "Added to favorites"
                        : favorites.length >= maxFavorites
                          ? "Maximum favorites reached"
                          : "Add to favorites"
                    }
                    title={
                      isFavorite(selectedCity.id)
                        ? "Added to favorites"
                        : favorites.length >= maxFavorites
                          ? "Maximum 5 favorites"
                          : "Add to favorites"
                    }
                    className="rounded-xl bg-(--accent) p-2.5 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isFavorite(selectedCity.id) ? (
                      <Heart fill="currentColor" size={20} />
                    ) : (
                      <Heart size={20} />
                    )}
                  </button>

                </div>
              </div>

              {isLoading && (
                <Skeleton />
              )}

              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
                  <p className="font-semibold text-red-400">
                    Unable to load weather data
                  </p>

                  <p className="mt-2 text-sm text-(--muted)">
                    {error}
                  </p>

                  <button
                    type="button"
                    onClick={refetch}
                    className="mt-4 rounded-xl bg-(--accent) px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {weather && !isLoading && !error && (
                <>
                  <div className="mb-5">
                    <p className="text-sm text-(--muted)">
                      Current temperature
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                      <WeatherAnimation
                        code={weather.current.weather_code}
                        size="sm"
                      />

                      <span className="text-5xl font-bold tracking-tight text-(--text)">
                        {convertTemperature(weather.current.temperature_2m)}°{unit === "celsius" ? "C" : "F"}
                      </span>

                      <p className="text-sm text-(--muted)">
                        {getWeatherCondition(weather.current.weather_code)}
                      </p>

                      <span className="text-sm text-(--muted)">
                        {weather.current.is_day ? "Daytime" : "Nighttime"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl bg-(--surface-hover) p-5">
                      <div className="flex items-center gap-2 text-sm text-(--muted)">
                        <Thermometer size={18} />
                        Feels like
                      </div>
                      <p className="mt-3 text-2xl font-semibold text-(--text)">
                        {convertTemperature(weather.current.apparent_temperature)}°{unit === "celsius" ? "C" : "F"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-(--surface-hover) p-5">
                      <div className="flex items-center gap-2 text-sm text-(--muted)">
                        <Droplets size={18} />
                        Humidity
                      </div>
                      <p className="mt-3 text-2xl font-semibold text-(--text)">
                        {weather.current.relative_humidity_2m}%
                      </p>
                    </div>

                    <div className="rounded-2xl bg-(--surface-hover) p-5">
                      <div className="flex items-center gap-2 text-sm text-(--muted)">
                        <Wind size={18} />
                        Wind speed
                      </div>
                      <p className="mt-3 text-2xl font-semibold text-(--text)">
                        {weather.current.wind_speed_10m} km/h
                      </p>
                    </div>
                  </div>

                  <Forecast daily={weather.daily} />
                </>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TemperatureProvider>
        <Dashboard />
      </TemperatureProvider>
    </ThemeProvider>
  );
}

export default App;
