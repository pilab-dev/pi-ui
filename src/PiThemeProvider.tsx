import { alpha, createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import { createContext, PropsWithChildren, useMemo } from "react";

export const primaryColor = "#0279AE";
const cardBorderColor = "#24242433";

type ThemeMode = "auto" | "light" | "dark";

type PiProviderProps = {
  themeMode?: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
};

export interface IPiThemeContext {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

/* eslint-disable-next-line */
export const PiThemeContext = createContext<IPiThemeContext | null>(null);

export const PiThemeProvider: React.FC<PropsWithChildren<PiProviderProps>> = ({ children, themeMode, setThemeMode }) => {
  const osDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const prefersDarkMode = themeMode === "auto" ? osDarkMode : themeMode === "dark";

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          allVariants: {
            opacity: themeMode === "dark" ? undefined : "1",
          },
          h6: {
            fontWeight: 500,
            fontSize: "0.9em",
          },
          button: {
            fontWeight: 400,
          },
        },
        mixins: {
          toolbar: {
            minHeight: 45,
            // backgroundColor: "#333",
          },
        },
        shape: {
          borderRadius: 2,
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: themeMode === "light" ? "#333" : undefined,
              },
            },
          },
          MuiMenuItem: {
            defaultProps: {
              dense: true,
            },
          },
          MuiPaper: {
            defaultProps: {
              square: true,
            },
          },
          MuiButtonBase: {
            styleOverrides: {
              root: {
                fontSize: ".9em",
              },
            },
          },
          MuiFormHelperText: {
            styleOverrides: {
              root: {
                margin: "3px 0 0 0",
              },
            },
          },
          MuiFormLabel: {
            styleOverrides: {
              root: {
                fontSize: "0.9em",
              },
            },
          },
          MuiTypography: {
            styleOverrides: {
              root: {
                fontWeight: 300,
                fontSize: "1rem",
              },
            },
          },
          MuiCheckbox: {
            defaultProps: {
              size: "small",
            },
          },
          MuiInputBase: {
            defaultProps: {
              size: "small",
            },
            styleOverrides: {
              inputAdornedEnd: {
                padding: 0,
              },
              root: {
                borderRadius: "0 !important",
              },
              input: {
                fontWeight: 400,
              },
            },
          },
          MuiButton: {
            defaultProps: {
              variant: "text",
              disableFocusRipple: true,
              disableRipple: true,
            },
            styleOverrides: {
              disableElevation: true,
              text: {
                fontWeight: "medium",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                border: `${cardBorderColor} 1px solid`,
                boxShadow: `0px 2px 1px -1px rgba(0,0,0,0.2),
                0px 1px 1px 0px rgba(0,0,0,0.14),
                0px 1px 3px 0px rgba(0,0,0,0.12)`,
              },
            },
          },
          MuiList: {
            defaultProps: {
              disablePadding: true,
            },
          },
          MuiListItemButton: {
            styleOverrides: {
              root: {
                transition: "background-color 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: alpha(primaryColor, 0.1),
                },
              },
            },
          },
        },
        palette: {
          primary: {
            main: primaryColor,
          },
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode, themeMode]
  );

  return (
    <PiThemeContext.Provider
      value={{
        themeMode: prefersDarkMode ? "dark" : "light",
        setThemeMode,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </PiThemeContext.Provider>
  );
};

export default PiThemeProvider;
