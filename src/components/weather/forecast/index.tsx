import { useTemperature } from "../../../context/TemperatureContext";
import type { OpenMeteoResponse } from "../../../types/weather";
import WeatherAnimation from "../weather_animation";

interface ForecastProps {
  daily: OpenMeteoResponse["daily"];
}

function getDayName(date: string, index: number) {
  if (index === 0) return "Today";

  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
  });
}

export default function Forecast({ daily }: ForecastProps) {
  const {
    unit,
    convertTemperature
  } = useTemperature();

  return (
    <section className="mt-5 rounded-3xl border border-(--border) bg-(--surface) p-6 sm:p-8">
      <h3 className="mb-6 text-lg font-semibold text-(--text)">
        5-Day Forecast
      </h3>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {daily.time.map((date, index) => {
          return (
            <div
              key={date}
              className="flex flex-col items-center rounded-2xl bg-(--surface-hover) p-4 text-center"
            >
              <p className="text-sm font-semibold text-(--text)">
                {getDayName(date, index)}
              </p>

              <p className="mt-1 text-xs text-(--muted)">
                {new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })}
              </p>

              <WeatherAnimation
                code={daily.weather_code[index]}
                size="sm"
              />

              <div className="flex items-center gap-2">
                <span className="font-semibold text-(--text)">
                  {convertTemperature(daily.temperature_2m_max[index])}°{unit === "celsius" ? "C" : "F"}
                </span>

                <span className="text-sm text-(--muted)">
                  {convertTemperature(daily.temperature_2m_min[index])}°{unit === "celsius" ? "C" : "F"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
