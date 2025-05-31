import { alpha, Tab, Tabs, TabsProps, useTheme } from "@mui/material";

const tabMinHeight = "32px";

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

/**
 *  The tab panel content. The role is tabpanel, and rendered, when the tab index is equals with.
 *
 *    ```jsx
 *    <PiTabPanel index={idx}>
 *      <Box>Content panel</Box>
 *    <PiTabPanel>
 *    ```
 */
export const PiTabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      style={{ width: "100%" }}
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

/**
 *  The tabs component.
 *
 *    ```jsx
 *    <PiTabs>
 *      <PiTab label="Tab 1" />
 *      <PiTab label="Tab 2" />
 *    </PiTabs>
 *    ```
 */
export const PiTabs = (props: TabsProps) => {
  const theme = useTheme();
  return (
    <Tabs
      {...props}
      sx={{
        ...props.sx,
        borderBottom: `1px solid ${theme.palette.divider}`,
        minHeight: tabMinHeight,
        "& .MuiTabs-indicator": {
          backgroundColor: theme.palette.primary.main,
          height: "3px",
        },
      }}
    />
  );
};

export type PiTabProps = typeof Tab & { label: React.ReactNode };

export const PiTab = (props: Omit<PiTabProps, "disableRipple">) => {
  const theme = useTheme();

  return (
    <Tab
      disableRipple
      {...props}
      sx={{
        textTransform: "none",
        fontWeight: theme.typography.fontWeightLight,
        fontSize: "15px",
        color: alpha(theme.palette.text.primary, 0.7),
        minWidth: 0,
        minHeight: tabMinHeight,
        marginLeft: 10,
        marginRight: 10,
        padding: "5px",
        "&.Mui-selected": {
          color: theme.palette.text.primary,
          // Active tab color
          "&:hover": {
            color: alpha(theme.palette.text.primary, 0.9),
          },
        },
        "&:hover": {
          color: theme.palette.text.primary,
          opacity: 1,
        },
      }}
    />
  );
};
