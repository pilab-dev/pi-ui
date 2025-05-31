/* elsint:disable */
import { Warning } from "@mui/icons-material";
import { Box, Link } from "@mui/material";

export type PiErrorBoxProps = {
  onBack?: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

const PiErrorBox: React.FC<PiErrorBoxProps> = ({ onBack, icon, children }) => {
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
      {onBack && (
        <Link onClick={onBack} underline="hover">
          go back
        </Link>
      )}
    </Box>
  );
};

export default PiErrorBox;
