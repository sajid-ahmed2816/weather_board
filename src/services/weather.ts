
import type { OpenMeteoResponse } from "../types/weather";

const WEATHER_BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function getWeather(
  latitude: number,
  longitude: number,
): Promise<OpenMeteoResponse> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
    ].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "uv_index_max",
    ].join(","),
    timezone: "auto",
    forecast_days: "5",
  });

  const response = await fetch(
    `${WEATHER_BASE_URL}?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error(
      `Unable to fetch weather data. Server returned ${response.status}.`,
    );
  }

  const data: OpenMeteoResponse = await response.json();

  return data;
}
