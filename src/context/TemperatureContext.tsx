import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type TemperatureUnit = "celsius" | "fahrenheit";

interface TemperatureContextType {
  unit: TemperatureUnit;
  toggleUnit: () => void;
  convertTemperature: (celsius: number) => number;
}

const TemperatureContext = createContext<
  TemperatureContextType | undefined
>(undefined);

function getInitialUnit(): TemperatureUnit {
  try {
    const savedUnit = localStorage.getItem("weatherboard-unit");

    if (savedUnit === "celsius" || savedUnit === "fahrenheit") {
      return savedUnit;
    }
  } catch {
    // localStorage may be unavailable
  }

  return "celsius";
}

interface TemperatureProviderProps {
  children: ReactNode;
}

export function TemperatureProvider({
  children,
}: TemperatureProviderProps) {
  const [unit, setUnit] = useState<TemperatureUnit>(getInitialUnit);

  useEffect(() => {
    try {
      localStorage.setItem("weatherboard-unit", unit);
    } catch {
      // Temperature unit still works for the current session
    }
  }, [unit]);

  function toggleUnit() {
    setUnit((currentUnit) =>
      currentUnit === "celsius" ? "fahrenheit" : "celsius",
    );
  }

  function convertTemperature(celsius: number): number {
    if (unit === "fahrenheit") {
      return Math.round((celsius * 9) / 5 + 32);
    }

    return Math.round(celsius);
  }

  return (
    <TemperatureContext.Provider
      value={{ unit, toggleUnit, convertTemperature }}
    >
      {children}
    </TemperatureContext.Provider>
  );
}

export function useTemperature() {
  const context = useContext(TemperatureContext);

  if (!context) {
    throw new Error(
      "useTemperature must be used inside TemperatureProvider",
    );
  }

  return context;
}