import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Weather Board",
        short_name: "WeatherBoard",
        description: "Your daily weather companion",
        theme_color: "#0b1220",
        background_color: "#0b1220",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [

          {
            urlPattern: ({ url }) =>
              url.origin === "https://api.open-meteo.com" &&
              url.pathname === "/v1/forecast",
            handler: "NetworkFirst",
            options: {
              cacheName: "weather-api-cache",
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 86400,
              },
              cacheableResponse: {
                statuses: [200],
              },
            },
          },

        ],
      },
    }),
  ],
})
