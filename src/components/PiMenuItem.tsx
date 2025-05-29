import { ListItemIcon, MenuItem } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";

import { FC, ReactNode } from "react";

type PiMenuItemProps = {
  label: string;
  noIcon?: boolean;
  icon?: ReactNode;
  checked?: boolean;
  onClick?: () => void;
};

const PiMenuItem: FC<PiMenuItemProps> = ({ noIcon, label, icon, checked, onClick }) => {
  return (
    <MenuItem dense onClick={onClick}>
      {!noIcon && <ListItemIcon>{icon || (checked && <CheckIcon color="primary" />)}</ListItemIcon>}
      {label}
    </MenuItem>
  );
};

export default PiMenuItem;
