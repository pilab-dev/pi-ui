import { Button as MuiButton, styled } from "@mui/material";

export const Button = styled(MuiButton)(({ theme }) => ({
  textTransform: "uppercase",
  fontSize: "12px",
  fontWeight: theme.typography.fontWeightRegular,
  padding: 0,
  letterSpacing: "0.09em",
  borderRadius: "3px",
  "&.MuiButton-containedPrimary": {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

export default Button;
