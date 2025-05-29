import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export const PiFormContainer: FC<PropsWithChildren> = ({ children }) => (
  <Box display="flex" flexDirection="column" gap={1}>
    {children}
  </Box>
);
