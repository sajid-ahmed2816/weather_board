
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-(--border) bg-(--surface) text-(--text) transition-colors hover:bg-(--surface-hover)"
    >
      {isDark ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}
