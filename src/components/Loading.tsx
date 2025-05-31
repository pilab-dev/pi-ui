import { Box, CircularProgress, Typography } from "@mui/material";
import FullScreenLoader from "./FullScreenLoader";

type LoadingProps = {
  message?: string;
  fullScreen?: boolean;
};

const Loading = ({ message = "Loading...", fullScreen }: LoadingProps) => {
  const IndicatorPass = () => (
    <Box display="flex" flexDirection="row" gap={1} alignItems="center">
      <CircularProgress color="primary" size={14} />

      <Typography variant="caption">{message}</Typography>
    </Box>
  );

  if (fullScreen) {
    return (
      <FullScreenLoader>
        <IndicatorPass />
      </FullScreenLoader>
    );
  }

  return <IndicatorPass />;
};

export default Loading;
