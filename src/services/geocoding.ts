import type { City, OpenMeteoGeocodingResponse } from "../types/city";

const GEOCODING_BASE_URL = import.meta.env.VITE_GEOCODING_BASE_URL;

export async function searchCities(
  query: string,
  signal?: AbortSignal,
): Promise<City[]> {
  const params = new URLSearchParams({
    name: query,
    count: "10",
    language: "en",
    format: "json",
  });

  const response = await fetch(
    `${GEOCODING_BASE_URL}?${params.toString()}`,
    {
      method: "GET",
      signal,
    },
  );

  if (!response.ok) {
    throw new Error(
      `Unable to search cities. Server returned ${response.status}.`,
    );
  }

  const result: OpenMeteoGeocodingResponse =
    await response.json();

  return (result.results ?? [])
    .filter((city) => city.feature_code?.startsWith("P"))
    .map((city) => ({
      id: city.id,
      city: city.name,
      name: city.name,
      country: city.country ?? "Unknown country",
      countryCode: city.country_code ?? "",
      region: city.admin1 ?? "",
      latitude: city.latitude,
      longitude: city.longitude,
      population: city.population,
      featureCode: city.feature_code,
      timezone: city.timezone,
    }));
}
