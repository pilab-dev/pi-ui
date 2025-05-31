import { useContext, useState } from "react";
import { piThemeContext } from "./PiThemeProvider";

export const useTheme = () => {
  const context = useContext(piThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a PiThemeProvider");
  }

  return context;
};

export const useThemeMode = () => {
  const context = useContext(piThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a PiThemeProvider");
  }

  return context.themeMode;
};

export const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);
  return [value, () => setValue(!value)];
};
