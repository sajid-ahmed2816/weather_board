# WeatherBoard 🌤️

A responsive, installable weather dashboard that helps you check current weather conditions and a 5-day forecast for cities around the world.

**Live Demo:** [WeatherBoard](YOUR_DEPLOYED_URL)

## Features

- **City Search:** Search cities worldwide with live autocomplete suggestions.
- **Current Weather:** View current temperature, feels-like temperature, humidity, wind speed, and weather conditions.
- **5-Day Forecast:** View upcoming weather conditions with daily minimum and maximum temperatures.
- **Favorite Cities:** Save up to 5 favorite cities for quick access.
- **Dark & Light Theme:** Switch between dark and light modes. Your preference is saved.
- **Temperature Units:** Toggle between Celsius and Fahrenheit.
- **Daily Weather Reminder:** Enable browser notifications and choose a preferred reminder time.
- **Progressive Web App (PWA):** Install WeatherBoard on supported devices.
- **Offline Support:** Access the previously cached weather data when offline, with an offline status indicator.
- **Responsive Design:** Optimized for mobile, tablet, and desktop screens.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS v4
- CSS Variables
- Lucide React
- Open-Meteo Geocoding API
- Open-Meteo Weather Forecast API
- Vite PWA Plugin
- Workbox
- Browser Local Storage
- Browser Notifications API

## APIs

WeatherBoard uses free Open-Meteo APIs. No API key is required.

- **Geocoding API:** https://geocoding-api.open-meteo.com/
- **Weather Forecast API:** https://open-meteo.com/

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd weather_board
```

Install dependencies:

```bash
npm install
```

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

## PWA and Offline Support

WeatherBoard uses `vite-plugin-pwa` and Workbox for service worker registration and caching.

- The application can be installed on supported devices.
- The app shell is cached for offline access.
- Previously requested weather forecast data can be served from cache.
- An offline indicator informs users when their device has no network connection.

**Note:** Offline weather availability depends on whether the requested city's data has already been cached.

## Daily Reminder

WeatherBoard uses the browser Notifications API to schedule daily weather reminders.

- Users can choose their preferred reminder time.
- Notification permission is requested when enabling reminders.
- Reminder preferences are saved locally.
- Notifications require the browser to remain running. Reliable notifications when the browser is completely closed require a server-side push notification service.

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

## Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

The generated production files are available in the `dist/` directory.

## Author

Developed as a responsive weather dashboard project using React, TypeScript, and Vite.

## Repository

[View WeatherBoard on GitHub](YOUR_GITHUB_REPOSITORY_URL)
