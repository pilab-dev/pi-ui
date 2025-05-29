import { Box, Divider, Typography } from "@mui/material";
import { FC, PropsWithChildren, ReactNode } from "react";

export const PiToolbarDivider = () => (
  <Divider
    orientation="vertical"
    variant="fullWidth"
    style={{
      // marginTop: "10px",
      height: "26px",
    }}
  />
);

type PiToolbarProps = {
  icon: ReactNode;
  label: string | ReactNode;
  actions?: ReactNode;
};

const PiToolbar: FC<PropsWithChildren<PiToolbarProps>> = ({ icon, label, actions, children }) => {
  return (
    <Box flex={1} display="flex" flexDirection="row">
      <Box
        flex={1}
        style={{
          height: "40px",
          fontWeight: "300",
          margin: "8px",
          marginBottom: 0,
          // marginLeft: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          justifyItems: "center",
          alignItems: "center",
          alignContent: "center",
          gap: "10px",
        }}
      >
        {icon}
        <Typography style={{ padding: 0, marginBottom: "-5px", fontSize: "23px" }}>{label}</Typography>
        <PiToolbarDivider />
        {children}
        <div style={{ flex: 1 }} />
        {actions}
      </Box>
    </Box>
  );
};

export default PiToolbar;
