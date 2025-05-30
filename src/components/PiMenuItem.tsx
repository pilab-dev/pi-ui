import { ListItemIcon, MenuItem } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";

import { ReactNode } from "react";

type PiMenuItemProps = {
  label: string;
  noIcon?: boolean;
  icon?: ReactNode;
  checked?: boolean;
  onClick?: () => void;
};

export const PiMenuItem: React.FC<PiMenuItemProps> = ({ noIcon, label, icon, checked, onClick }) => {
  return (
    <MenuItem dense onClick={onClick}>
      {!noIcon && <ListItemIcon>{icon || (checked && <CheckIcon color="primary" />)}</ListItemIcon>}
      {label}
    </MenuItem>
  );
};

