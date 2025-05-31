import { useContext, useState } from "react";
import { PiThemeContext } from "./PiThemeProvider";

export const useTheme = () => {
  const context = useContext(PiThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const useThemeMode = () => {
  const context = useContext(PiThemeContext);
  if (context === null) {
    throw new Error("useThemeMode must be used within a ThemeProvider");
  }
  return context.themeMode;
};

export const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);
  return [value, () => setValue(!value)];
};