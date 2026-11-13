
import { useState } from "react";
import { CloudSun, Bell } from "lucide-react";
import ThemeToggle from "../theme_toggle";
import Reminder from "../reminder";

export default function Header() {
  const [isReminderOpen, setIsReminderOpen] = useState(false);

  return (
    <header className="relative z-40 border-b border-(--border) bg-(--surface)">
      <div className="mx-auto flex max-w-360 items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--accent) text-white">
            <CloudSun size={23} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-(--text)">
              Weather Board
            </h1>
            <p className="text-xs text-(--muted)">
              Your daily weather companion
            </p>
          </div>
        </div>

        <div className="relative flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsReminderOpen((prev) => !prev)}
            aria-label="Toggle weather reminder settings"
            aria-expanded={isReminderOpen}
            title="Weather reminder"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--border) bg-(--surface) text-(--text) transition-colors hover:bg-(--surface-hover)"
          >
            <Bell size={20} />
          </button>

          <ThemeToggle />

          <div
            className={`absolute right-0 top-full mt-3 w-[min(22rem,calc(100vw-2.5rem))] rounded-2xl border border-(--border) bg-(--surface) p-4 shadow-xl ${isReminderOpen ? "block" : "hidden"
              }`}
          >
            <Reminder />
          </div>
        </div>
      </div>
    </header>
  );
}
