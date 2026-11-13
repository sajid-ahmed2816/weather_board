
interface WeatherAnimationProps {
  code: number;
  size?: "sm" | "lg";
}

export default function WeatherAnimation({
  code,
  size = "lg",
}: WeatherAnimationProps) {
  let animation = "cloudy";

  if (code === 0) {
    animation = "sunny";
  } else if (code <= 3) {
    animation = "partly-cloudy";
  } else if (code <= 48) {
    animation = "foggy";
  } else if (code <= 55) {
    animation = "drizzle";
  } else if (code <= 67) {
    animation = "rainy";
  } else if (code <= 77) {
    animation = "snowy";
  } else if (code <= 82) {
    animation = "rainy";
  } else if (code <= 86) {
    animation = "snowy";
  } else if (code <= 99) {
    animation = "thunderstorm";
  }

  return (
    <div
      className={`weather-animation weather-animation--${animation} ${size === "sm" ? "weather-animation--sm" : "weather-animation--lg"
        }`}
      role="img"
      aria-label={`Animated weather condition: ${animation}`}
    >
      <span className="weather-sun" />
      <span className="weather-cloud weather-cloud--back" />
      <span className="weather-cloud weather-cloud--front" />

      <span className="weather-rain">
        <i />
        <i />
        <i />
      </span>

      <span className="weather-snow">
        <i />
        <i />
        <i />
      </span>

      <span className="weather-fog">
        <i />
        <i />
        <i />
      </span>

      <span className="weather-lightning" />
    </div>
  );
}
