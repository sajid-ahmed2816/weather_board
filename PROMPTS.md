# WeatherBoard — Engineering Prompts, Decisions & Debugging History

This document records selected engineering decisions, meaningful debugging incidents, and their resolutions during WeatherBoard development.

It is a curated technical history, not a complete transcript of every development step.

## 1. Development Approach

**Development workflow:**

- Used ChatGPT for technical guidance, implementation planning, debugging, and code review.
- Implemented the suggested changes directly in the project.
- Verified changes through TypeScript checks, development testing, production builds, browser testing, and mobile PWA testing.
- Did not use Antigravity, Cursor, or OpenCode as development agents.

**Engineering consideration:**

How can an AI-assisted development workflow remain understandable and maintainable instead of blindly accepting generated code?

**Decision:**

Used ChatGPT as a development assistant while reviewing, implementing, and testing changes incrementally. Technical decisions and relevant debugging outcomes were documented rather than preserving every conversation or routine coding step.

## 2. Representative Prompts Used

The following are representative examples of prompts used during development. They are paraphrased to summarize the actual development discussions rather than reproduce complete chat transcripts.

- How should I implement city autocomplete with a 300ms debounce, API error handling, and cancellation of outdated requests?
- How can I structure current weather and five-day forecast data using reusable React components, hooks, and TypeScript types?
- How should I implement favorites with a maximum limit of five cities and graceful localStorage error handling?
- How can I configure a Vite PWA with Workbox to cache weather API responses and support offline access?
- Why are notifications not appearing in an installed Android PWA, and how should Service Worker notifications be implemented?
- How can I create lightweight CSS weather animations with support for reduced-motion preferences?

These examples summarize the types of guidance requested from ChatGPT throughout development.

## 3. Technology Stack

**Engineering consideration:**

What frontend stack would support a responsive, installable weather dashboard with maintainable TypeScript code?

**Decision:**

- React with TypeScript
- Vite for development and production builds
- Tailwind CSS v4 for responsive layouts
- CSS variables for theme management
- Lucide React for icons

## 4. Geocoding API — Incorrect City Resolution

**Problem:**

The initial GeoDB/RapidAPI integration returned incorrect city matches. For example, searching for Lahore resolved to Lahore, Virginia, instead of Lahore, Punjab, Pakistan.

Adding a Pakistan country filter did not reliably return the intended city.

**Debugging consideration:**

How can city autocomplete return geographically accurate results, especially when multiple cities share the same name?

**Root cause:**

The issue was with geocoding provider results, not the weather API. The weather API itself was responding successfully.

**Resolution:**

- Replaced GeoDB city search with the Open-Meteo Geocoding API.
- Kept the existing weather service unchanged.
- Normalized Open-Meteo results into the application's existing `City` type.
- Filtered results using populated-place feature codes to avoid irrelevant airports and landmarks.
- Preserved the existing `searchCities()` interface to minimize changes across the application.

## 5. City Search Optimization

**Engineering consideration:**

How can autocomplete requests be optimized while users type without producing unnecessary API calls or stale results?

**Decision:**

- Added a 300ms debounce.
- Used `AbortController` to cancel outdated requests.
- Added loading, error, and empty-result states.
- Required users to select a suggested city rather than treating arbitrary input as a valid selection.

## 6. Weather Data Architecture

**Engineering consideration:**

How should current weather conditions and a five-day forecast be fetched and represented using TypeScript?

**Decision:**

Separated responsibilities into weather services, type definitions, reusable hooks, and UI components.

Used Open-Meteo forecast data for current weather and daily forecasts.

## 7. Persistent User Preferences

**Engineering consideration:**

How can favorites, theme preferences, temperature units, and other user settings persist across page reloads?

**Decision:**

- Used `localStorage` for persistent preferences.
- Added error handling around storage operations.
- Used React Context and reusable hooks where appropriate.
- Limited favorite cities to five.
- Added city selection and removal confirmation.

## 8. PWA, Service Workers & Offline Caching

**Engineering consideration:**

How can WeatherBoard be installable and continue displaying previously requested weather information when the network is unavailable?

**Decision:**

- Integrated `vite-plugin-pwa` and Workbox.
- Configured a NetworkFirst caching strategy for Open-Meteo forecast requests.
- Configured a network timeout and cached response expiration.
- Added online/offline status handling and an offline indicator.

### Debugging: Offline testing on the development server

**Problem:**

Offline refresh testing did not behave as expected when using the Vite development server.

**Root cause:**

The development server does not provide the same production service-worker behavior as the built PWA.

**Resolution:**

Used a production build and preview/deployed application for meaningful service-worker and offline-cache testing.

## 9. Mobile PWA Installation & Secure Context

**Problem:**

The PWA did not behave correctly when accessed from an Android device through the computer's local network IP address.

**Debugging consideration:**

Why do service workers and PWA installation behave differently over a local HTTP network address and a deployed HTTPS website?

**Root cause:**

Service workers require a secure context. An ordinary LAN IP accessed over HTTP does not meet this requirement. Localhost is a development exception.

**Resolution:**

- Built the production application.
- Deployed WeatherBoard to Vercel over HTTPS.
- Tested PWA installation and service-worker behavior using the deployed URL.
- Verified mobile installation and offline behavior on the deployed application.

## 10. Browser-Based Daily Weather Reminder

**Engineering consideration:**

How can users configure a daily weather reminder without introducing a backend?

**Initial implementation:**

- Used the browser Notifications API.
- Stored the selected reminder time and enabled state in `localStorage`.
- Used `setTimeout` to schedule the next reminder.
- Added permission handling and enable/disable controls.

### Debugging: Android installed PWA notifications

**Problem:**

On Android, the installed WeatherBoard PWA had notification permission granted, but notifications were not appearing.

**Root cause identified:**

The implementation used `new Notification()`. For installed PWAs on Android, notifications should be displayed through the active Service Worker's `showNotification()` method.

**Resolution:**

- Retrieved the active registration using `navigator.serviceWorker.ready`.
- Added a reusable notification helper using `registration.showNotification()`.
- Added an immediate test notification when enabling the reminder.
- Updated scheduled notifications to use the same helper.

**Known limitation:**

The current reminder scheduler still relies on `setTimeout`. Mobile operating systems and browsers may suspend the application in the background or stop its timers after the app is closed.

Reliable scheduled notifications when the application is not running require a server-side Web Push implementation, including push subscription management and a push service.

The current implementation should therefore be described as a browser-based reminder, not guaranteed background push delivery.

## 11. Responsive Layout & Mobile Usability

**Engineering consideration:**

How can the dashboard remain usable across mobile, tablet, and desktop screen sizes without horizontal overflow?

**Decision:**

- Used responsive Tailwind breakpoints.
- Adjusted weather cards and forecast layouts for smaller screens.
- Used compact favorite-city chips.
- Tested layouts at 375px, 768px, and 1280px.
- Checked mobile interaction targets and horizontal overflow.
- Tested the deployed PWA on Android.

## 12. Animated Weather Conditions

**Requirement:**

Display animated weather conditions using Lottie or CSS animations.

**Engineering decision:**

Chose CSS animations to avoid an additional animation dependency and keep the application lightweight.

**Implementation:**

- Created a reusable `WeatherAnimation` component.
- Used Open-Meteo `weather_code` values to select the animation.
- Added sunny, partly cloudy, cloudy, foggy, drizzle, rainy, snowy, and thunderstorm animations.
- Added small and large animation sizes.
- Integrated animations into current weather and five-day forecast cards.
- Added `prefers-reduced-motion` support for accessibility.

**Relevant files:**

- Component: `src/components/weather_animation/WeatherAnimation.tsx`
- Animation styles: `src/index.css`
- Current weather integration: `src/App.tsx`
- Forecast integration: `Forecast.tsx`

## 13. Deployment & Verification

**Engineering consideration:**

How can the final application be verified beyond simply checking whether it runs locally?

**Verification performed:**

- TypeScript and build checks.
- City search and weather-data retrieval.
- Favorites and persistent preferences.
- Theme and temperature-unit switching.
- Five-day forecast rendering.
- PWA installation.
- Offline cache behavior.
- Responsive layout testing.
- Deployed HTTPS application testing.
- Android PWA testing.

**Deployment:** https://weatherboard-black.vercel.app/

**Source repository:** https://github.com/sajid-ahmed2816/weather_board

---

*This document intentionally focuses on meaningful technical decisions and debugging outcomes. It does not claim that every feature was generated automatically or that an IDE-based AI coding agent was used.*