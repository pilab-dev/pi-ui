import { ButtonProps, Button as MuiButton, useTheme } from "@mui/material";

// const Button = styled(MuiButton)(({ theme }) => ({
//   textTransform: "uppercase",
//   fontSize: "12px",
//   fontWeight: theme.typography.fontWeightRegular,
//   padding: 0,
//   letterSpacing: "0.09em",
//   borderRadius: "3px",
//   "&.MuiButton-containedPrimary": {
//     fontWeight: theme.typography.fontWeightMedium,
//   },
// }));

const Button = (props: ButtonProps) => {
  const theme = useTheme();

  return (
    <MuiButton
      {...props}
      sx={{
        ...props.sx,
        textTransform: "uppercase",
        fontSize: "12px",
        fontWeight: theme.typography.fontWeightRegular,
        padding: 0,
        letterSpacing: "0.09em",
        borderRadius: "3px",
        "&.MuiButton-containedPrimary": {
          fontWeight: theme.typography.fontWeightMedium,
        },
      }}
    />
  );
};

export default Button;
