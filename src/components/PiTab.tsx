import { alpha, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

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
export const PiTabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
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

// Styled Tabs similar to the ones in the vSphere interface
export const PiTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  minHeight: tabMinHeight,
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.primary.main,
    height: "3px",
  },
}));

export type PiTabProps = typeof Tab & { label: React.ReactNode };

export const PiTab = styled((props: Omit<PiTabProps, "disableRipple">) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
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
  })
);

export default PiTab;
