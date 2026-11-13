
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
    <div className="w-full">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--surface-hover) text-(--accent)">
          <Bell size={21} />
        </div>

        <div>
          <h3 className="text-base font-semibold text-(--text)">
            Daily Weather Reminder
          </h3>
          <p className="text-xs text-(--muted)">
            Get a daily reminder to check the weather.
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-(--muted)">
        WeatherBoard needs notification permission to send you a daily
        reminder at your selected time. You can change or disable this
        reminder anytime.
      </p>

      <div className="mt-6">
        <label
          htmlFor="reminder-time"
          className="mb-2 block text-sm font-medium text-(--text)"
        >
          Choose reminder time
        </label>


        <div className="flex flex-col gap-3">
          <div className="relative w-full">
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

          <div className="flex w-full gap-2">
            <button
              type="button"
              onClick={() => {
                console.log("Enable button clicked");
                enableReminder(selectedTime)
              }}
              className="flex h-9 flex-1 items-center justify-center gap-2 rounded-xl bg-(--accent) px-3 text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Bell size={17} />
              {isEnabled ? "Update" : "Enable"}
            </button>

            {isEnabled && (
              <button
                type="button"
                onClick={disableReminder}
                className="flex h-9 flex-1 items-center justify-center gap-2 rounded-xl border border-(--border) px-3 text-[12px] font-semibold text-(--text) transition-colors hover:bg-(--surface-hover)"
              >
                <BellOff size={17} />
                Disable
              </button>
            )}
          </div>
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
    </div>
  );
}
