import { alpha, Box, lighten, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

type PiListItemProps = {
  title: string;
  value: string;
  icon?: ReactNode;
  link?: string;
};

export const PiListItem: React.FC<PiListItemProps> = ({ title, value, icon, link }) => {
  const {
    palette: {
      primary: { main: mainColor },
      text: { primary: primary },
    },
  } = useTheme();

  return (
    <div>
      <Typography color={alpha(primary, 0.7)} pb={"4px"} fontWeight="normal" fontSize="14px">
        {title}
      </Typography>
      <Box
        component={link ? RouterLink : "div"}
        to={link}
        color={lighten(mainColor, 0.1)}
        letterSpacing="0.05em"
        // underline="hover"
        fontWeight="normal"
        // fontSize={"13px"}
      >
        <Box display="flex" fontSize="0.9em" flexDirection="row" gap={1} alignItems="center">
          {icon && (
            <Box width={20} display="flex" justifyContent="center" alignItems="center">
              {icon}
            </Box>
          )}

          {value}
        </Box>
      </Box>
    </div>
  );
};

