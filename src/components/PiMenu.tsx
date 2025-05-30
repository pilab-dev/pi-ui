import { alpha, Divider, Menu, MenuProps, styled, useTheme } from "@mui/material";
import { PropsWithChildren, ReactElement } from "react";

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    minWidth: "180px",
    borderRadius: 0,
    border: `1px solid ${theme.palette.background.paper}`,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  "& .MuiButtonBase-root": {
    padding: "5px 10px",
  },
  "& .MuiTypography-root": {
    fontSize: "14px",
    fontWeight: theme.typography.fontWeightLight,
  },
  "& .MuiListItemIcon-root": {
    marginLeft: "0",
    marginRight: "4px",
    minWidth: "20px",
  },
  "& .MuiMenuItem-root": {
    fontSize: "14px",
    fontWeight: theme.typography.fontWeightLight,
    border: "1px solid #ffffff00",
    "&:hover": {
      backgroundColor: theme.palette.primary.main + "15",
      border: `1px solid ${theme.palette.primary.light}`,
      fontWeignt: "normal",
    },
  },
}));

export type PiMenuProps = {
  anchorEl: null | HTMLElement;
  open: boolean;
  title?: string | ReactElement;
  onClose: () => void;
} & MenuProps;

export const PiMenu: React.FC<PropsWithChildren<PiMenuProps>> = ({ title, anchorEl, open, onClose, children, ...props }) => {
  const theme = useTheme();

  if (title) {
    children = [
      <div
        key="header"
        style={{
          padding: "5px 15px",
          background: alpha(theme.palette.background.paper, 0.4),
          fontSize: "13px",
          fontWeight: "bold",
        }}
      >
        {title}
      </div>,
      <Divider key="divider" />,
      children,
    ];
  } else {
    children = [<div style={{ height: "8px" }} />, children];
  }

  return (
    <StyledMenu anchorEl={anchorEl} open={open} onClose={onClose} elevation={9} {...props}>
      {children}
      <div style={{ height: "8px" }} />
    </StyledMenu>
  );
};
