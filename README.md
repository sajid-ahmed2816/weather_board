# WeatherBoard 🌤️

A responsive, installable weather dashboard built with React, TypeScript, and Vite. Check current weather conditions and a 5-day forecast for cities around the world.

**Live Demo:** [WeatherBoard](https://weatherboard-black.vercel.app/)

**GitHub Repository:** [weather_board](https://github.com/sajid-ahmed2816/weather_board)

## Features

- **City Search:** Search cities worldwide with debounced autocomplete suggestions.
- **Current Weather:** View temperature, feels-like temperature, humidity, wind speed, and weather conditions.
- **5-Day Forecast:** View upcoming weather conditions with daily minimum and maximum temperatures.
- **Favorite Cities:** Save up to 5 favorite cities for quick access, with local storage persistence.
- **Dark & Light Theme:** Switch between dark and light modes with saved preferences.
- **Temperature Units:** Toggle between Celsius and Fahrenheit without reloading.
- **Daily Weather Reminder:** Enable browser notifications and choose a preferred reminder time.
- **Progressive Web App:** Install WeatherBoard on supported desktop and mobile devices.
- **Offline Support:** Access previously cached weather data when offline, with an offline status indicator.
- **Responsive Design:** Optimized for mobile, tablet, and desktop screens.
- **Animated Weather Conditions:** CSS-based animations for different weather conditions.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS v4
- CSS Variables
- Lucide React
- Open-Meteo Geocoding API
- Open-Meteo Weather Forecast API
- vite-plugin-pwa
- Workbox
- Browser Local Storage
- Browser Notifications API

## APIs

WeatherBoard uses free Open-Meteo APIs. No API key is required.

- **Geocoding API:** [Open-Meteo Geocoding](https://geocoding-api.open-meteo.com/)
- **Weather Forecast API:** [Open-Meteo Forecast](https://open-meteo.com/)

### API Selection Note

The original assessment specified GeoDB Cities API for city autocomplete. During development, the GeoDB integration returned inaccurate city suggestions in testing. To provide more reliable city search results, Open-Meteo Geocoding API was used instead.

This is an implementation deviation from the original assessment requirement.

## Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_GEOCODING_BASE_URL=https://geocoding-api.open-meteo.com/v1/search
```

The application reads this variable using:

```ts
const GEOCODING_BASE_URL = import.meta.env.VITE_GEOCODING_BASE_URL;
```

Restart the development server after changing environment variables.

**Security Note:** Never store private API keys or secrets in variables prefixed with `VITE_`, because they are exposed to the browser.

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/sajid-ahmed2816/weather_board.git
```

Navigate to the project directory:

```bash
cd weather_board
```

Install dependencies:

```bash
npm install
```

Create the `.env.local` file using the configuration shown above.

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Run TypeScript checks and create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |

## Architecture Decisions

The project follows a component-based architecture with responsibilities separated into dedicated folders.

- **Components:** Reusable UI components organized by feature and layout.
- **Hooks:** Custom hooks handle reusable application logic, including weather fetching, favorites, online status, and reminders.
- **Services:** API communication and weather data handling are separated from UI components.
- **Context:** Shared application preferences, such as theme and temperature units, are managed through React Context.
- **Types:** TypeScript interfaces and types keep application data structured.
- **Utils:** Shared utility functions are kept separate from components.

Local storage is used to persist user preferences, favorites, and reminder settings across sessions.

## PWA and Offline Support

WeatherBoard uses `vite-plugin-pwa` and Workbox.

- The application is installable on supported devices.
- The service worker precaches application assets.
- Previously requested weather forecast responses are cached using a NetworkFirst strategy.
- Cached forecast data can be accessed when offline.
- An offline indicator informs users when their device has no network connection.

**Note:** Offline weather availability depends on whether the requested city's forecast data has already been cached.

## Daily Weather Reminder

WeatherBoard uses the browser Notifications API and Service Worker notifications.

- Users can select their preferred reminder time.
- Notification permission is requested when enabling reminders.
- Reminder preferences are saved locally.
- Notifications have been tested on desktop and mobile browsers.

**Limitation:** The current implementation uses browser-side scheduling and requires the browser to remain running. Reliable notifications when the browser is completely closed require a server-side Web Push implementation.

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── layout/
│   ├── search/
│   └── weather/
├── context/
├── hooks/
├── services/
├── types/
├── utils/
├── App.css
├── App.tsx
├── index.css
└── main.tsx
```

## Known Limitations

- City autocomplete uses Open-Meteo Geocoding instead of the GeoDB Cities API specified in the assessment.
- Offline weather access is limited to previously cached forecast responses.
- Daily reminders are browser-scheduled and are not guaranteed when the browser is completely closed.
- Weather information requires an internet connection unless the relevant forecast data is already cached.

## Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The generated production files are available in the `dist/` directory.

## Development Approach

ChatGPT was used for technical guidance, debugging, implementation discussions, and code reviews. Application code and project changes were manually implemented and tested.

See [PROMPTS.md](./PROMPTS.md) for a curated history of development prompts, technical decisions, and debugging discussions.

## Author

Developed as a frontend technical assessment project using React, TypeScript, and Vite.