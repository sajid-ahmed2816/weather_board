import { useEffect, useState } from "react";

const TIME_STORAGE_KEY = "weatherboard-reminder-time";
const ENABLED_STORAGE_KEY = "weatherboard-reminder-enabled";

type ReminderPermission = NotificationPermission | "unsupported";

function getPermission(): ReminderPermission {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "unsupported";
  }

  return Notification.permission;
}

async function showWeatherNotification() {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service Worker is not supported.");
  }

  const registration = await navigator.serviceWorker.ready;

  await registration.showNotification("WeatherBoard Daily Reminder", {
    body: "Time to check your weather forecast!",
    icon: "/pwa-192x192.png",
    badge: "/pwa-192x192.png",
  });
}

function getInitialTime(): string {
  try {
    return localStorage.getItem(TIME_STORAGE_KEY) ?? "08:00";
  } catch {
    return "08:00";
  }
}

function getInitialEnabled(): boolean {
  try {
    return localStorage.getItem(ENABLED_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function useWeatherReminder() {
  const [reminderTime, setReminderTime] = useState(getInitialTime);
  const [isEnabled, setIsEnabled] = useState(getInitialEnabled);
  const [permission, setPermission] =
    useState<ReminderPermission>(getPermission);

  const [message, setMessage] = useState<string | null>(null);

  async function enableReminder(time: string) {
    if (!time) {
      setMessage("Please select a reminder time.");
      return;
    }

    if (!("Notification" in window)) {
      setPermission("unsupported");
      setMessage("Notifications are not supported by this browser.");
      return;
    }

    let currentPermission = Notification.permission;

    if (currentPermission === "default") {
      currentPermission = await Notification.requestPermission();
    }

    setPermission(currentPermission);

    if (currentPermission !== "granted") {
      setMessage(
        "Notification permission was denied. Please enable it in browser settings.",
      );
      return;
    }

    setReminderTime(time);
    setIsEnabled(true);

    try {
      localStorage.setItem(TIME_STORAGE_KEY, time);
      localStorage.setItem(ENABLED_STORAGE_KEY, "true");
    } catch {
      // Reminder still works during the current session
    }

    try {
      await showWeatherNotification();

      setMessage(
        `Daily reminder enabled for ${time}. Test notification sent.`,
      );
    } catch {
      setMessage(
        "Reminder enabled, but notification could not be displayed.",
      );
    }
  }

  function disableReminder() {
    setIsEnabled(false);

    try {
      localStorage.removeItem(ENABLED_STORAGE_KEY);
      localStorage.removeItem(TIME_STORAGE_KEY);
    } catch {
      // Reminder is disabled for the current session
    }

    setMessage("Daily reminder disabled.");
  }

  useEffect(() => {
    if (!isEnabled || !reminderTime || permission !== "granted") {
      return;
    }

    let timer: number;

    function scheduleNextReminder() {
      const now = new Date();
      const [hours, minutes] = reminderTime.split(":").map(Number);

      const nextReminder = new Date();
      nextReminder.setHours(hours, minutes, 0, 0);

      if (nextReminder <= now) {
        nextReminder.setDate(nextReminder.getDate() + 1);
      }

      const delay = nextReminder.getTime() - now.getTime();

      timer = window.setTimeout(() => {
        showWeatherNotification().catch((error) => {
          console.error("Failed to show reminder:", error);
        }).finally(() => {
          scheduleNextReminder();
        });
      }, delay);
    }

    scheduleNextReminder();

    return () => window.clearTimeout(timer);
  }, [isEnabled, reminderTime, permission]);

  return {
    reminderTime,
    isEnabled,
    permission,
    message,
    enableReminder,
    disableReminder,
  };
}
