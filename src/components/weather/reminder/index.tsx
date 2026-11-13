
import { useState } from "react";
import { Bell, BellOff, Clock } from "lucide-react";
import { useWeatherReminder } from "../../../hooks/useWeatherReminder";

export default function Reminder() {
  const {
    reminderTime,
    isEnabled,
    permission,
    message,
    enableReminder,
    disableReminder,
  } = useWeatherReminder();

  const [selectedTime, setSelectedTime] = useState(reminderTime);

  return (
    <section className="mt-6 rounded-3xl border border-(--border) bg-(--surface) p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--surface-hover) text-(--accent)">
          <Bell size={21} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-(--text)">
            Daily Weather Reminder
          </h3>
          <p className="text-sm text-(--muted)">
            Get a daily reminder to check the weather.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="reminder-time"
          className="mb-2 block text-sm font-medium text-(--text)"
        >
          Choose reminder time
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Clock
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-(--muted)"
            />

            <input
              id="reminder-time"
              type="time"
              value={selectedTime}
              onChange={(event) => setSelectedTime(event.target.value)}
              className="h-12 w-full rounded-xl border border-(--border) bg-(--surface-hover) pl-10 pr-3 text-sm text-(--text) outline-none focus:border-(--accent)"
            />
          </div>

          <button
            type="button"
            onClick={() => enableReminder(selectedTime)}
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-(--accent) px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Bell size={17} />
            {isEnabled ? "Update Reminder" : "Enable Reminder"}
          </button>

          {isEnabled && (
            <button
              type="button"
              onClick={disableReminder}
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-(--border) px-5 text-sm font-semibold text-(--text) transition-colors hover:bg-(--surface-hover)"
            >
              <BellOff size={17} />
              Disable
            </button>
          )}
        </div>
      </div>

      {message && (
        <p role="status" className="mt-4 text-sm text-(--muted)">
          {message}
        </p>
      )}

      {permission === "denied" && (
        <p className="mt-2 text-sm text-red-400">
          Notifications are blocked. Allow them from your browser site settings.
        </p>
      )}

      {permission === "unsupported" && (
        <p className="mt-2 text-sm text-red-400">
          Your browser does not support notifications.
        </p>
      )}

      <p className="mt-4 text-xs leading-5 text-(--muted)">
        Notification permission will be requested when you enable the reminder.
        This version requires the browser to remain running. Closed-app
        reminders require a push notification service.
      </p>
    </section>
  );
}
