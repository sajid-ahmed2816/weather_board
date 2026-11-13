
import { CloudSun } from "lucide-react";
import ThemeToggle from "../theme_toggle";

export default function Header() {
  return (
    <header className="border-b border-(--border) bg-(--surface)">
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

        <ThemeToggle />
      </div>
    </header>
  );
}
