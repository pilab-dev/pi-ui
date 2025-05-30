import { Box, Divider, Typography } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export const PiSectionHeader = ({ children }: PropsWithChildren) => {
  return (
    <Box my={2}>
      <Typography fontSize={18}>{children}</Typography>
      <Divider variant="fullWidth" />
    </Box>
  );
};
