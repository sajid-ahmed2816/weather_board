# WeatherBoard — Engineering Prompts & Decisions

This document highlights selected technical decisions, implementation considerations, and non-repetitive debugging topics considered during the development of WeatherBoard.

## 1. Technology Stack

**Prompt / Consideration:**

What would be a suitable frontend stack for building a responsive, installable weather dashboard with maintainable TypeScript code?

**Decision:**
- React with TypeScript
- Vite for development and production builds
- Tailwind CSS v4 for responsive layouts
- CSS variables for theme management
- Lucide React for icons

## 2. Geocoding API Selection

**Prompt / Consideration:**

How can city autocomplete provide accurate international city results, particularly for cities with duplicate names across different countries?

**Decision:**

Replaced the initial GeoDB API integration with the Open-Meteo Geocoding API because of inconsistent city search results.

The application uses coordinates returned by geocoding to request weather data.

## 3. City Search Optimization

**Prompt / Consideration:**

How can autocomplete requests be optimized to avoid unnecessary API calls while users are typing?

**Decision:**
- Implemented a 300ms debounce.
- Used AbortController to cancel outdated requests.
- Added loading, empty-result, and error states.
- Required users to select a suggested city.

## 4. Weather Data Architecture

**Prompt / Consideration:**

How should current weather conditions and a five-day forecast be fetched and represented using TypeScript?

**Decision:**

Created separate weather service, type definitions, and a reusable weather hook to keep API logic separate from UI components.

## 5. Persistent User Preferences

**Prompt / Consideration:**

How can favorite cities, theme preferences, temperature units, and the last selected city persist across page reloads?

**Decision:**

Used localStorage with error handling and reusable React Contexts/hooks where appropriate.

Favorite cities are limited to five entries.

## 6. PWA and Offline Caching

**Prompt / Consideration:**

How can the application support installation and display previously fetched weather information when the device is offline?

**Decision:**
- Integrated vite-plugin-pwa and Workbox.
- Configured a NetworkFirst caching strategy for Open-Meteo forecast requests.
- Cached previously requested weather responses.
- Added an online/offline status indicator.

## 7. Offline Testing and Deployment

**Prompt / Consideration:**

Why does an installed PWA or service worker behave differently when accessed through a local network HTTP address compared with a deployed HTTPS website?

**Decision:**

Validated the production build and deployed HTTPS version because service workers and PWA installation require a secure context, with localhost as a development exception.

## 8. Browser Notification Limitations

**Prompt / Consideration:**

How can users configure a daily weather reminder using the browser Notifications API, and what happens when the browser is closed?

**Decision:**

Implemented a configurable reminder using browser notifications and local scheduling.

Documented that reliable notifications after completely closing the browser require a server-side push notification service.

## 9. Responsive Design and Mobile Testing

**Prompt / Consideration:**

How can the dashboard remain usable across mobile, tablet, and desktop screen sizes without horizontal overflow?

**Decision:**

Validated layouts at 375px, 768px, and 1280px, including mobile touch targets and interactive controls.


## Animated Weather Conditions

### Requirement
Display animated weather conditions using Lottie or CSS animations.

### Engineering Decision
- Chose CSS animations instead of Lottie to keep the application lightweight.
- Avoided adding an external animation dependency.
- Created a reusable `WeatherAnimation` component.
- Used Open-Meteo `weather_code` values to determine the animation.
- Added support for sunny, partly cloudy, cloudy, foggy, drizzle, rainy, snowy, and thunderstorm conditions.
- Added small and large animation sizes.
- Added `prefers-reduced-motion` support for accessibility.

### Implementation
- Component: `src/components/weather_animation/WeatherAnimation.tsx`
- Animation styles: `src/index.css`
- Current weather: Integrated into the current weather section in `App.tsx`.
- 5-day forecast: Integrated into each daily forecast card in `Forecast.tsx`.

### Prompt / Instruction
Implement lightweight, reusable CSS-based weather animations based on Open-Meteo weather codes. Use the same animation component for current weather and the 5-day forecast, with responsive sizing and reduced-motion accessibility support.

---

These notes document selected engineering considerations and decisions made during WeatherBoard development.

