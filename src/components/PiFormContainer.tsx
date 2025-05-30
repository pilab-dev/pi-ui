import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

export const PiFormContainer: React.FC<PropsWithChildren> = ({ children }) => (
  <Box display="flex" flexDirection="column" gap={1}>
    {children}
  </Box>
);
