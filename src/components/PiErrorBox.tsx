/* elsint:disable */
import { Warning } from "@mui/icons-material";
import { Box, Link } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

export type PiErrorBoxProps = {
  showBack?: boolean;
  icon?: React.ReactNode;
};

export const PiErrorBox: FC<PropsWithChildren<PiErrorBoxProps>> = ({ showBack, icon, children }) => {
  const navigate = useNavigate();

  return (
    <Box
      flex={1}
      display="flex"
      alignContent="center"
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}
      gap={1}
      textAlign="center"
    >
      <span>{icon ?? <Warning fontSize="large" color="primary" />}</span>
      {children}
      {showBack && (
        <Link onClick={() => navigate(-1)} underline="hover">
          go back
        </Link>
      )}
    </Box>
  );
};

export default PiErrorBox;
