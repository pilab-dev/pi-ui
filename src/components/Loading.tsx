import { Box, CircularProgress, styled, Typography } from "@mui/material";
import { FC } from "react";

type LoadingProps = {
  message?: string;
  fullScreen?: boolean;
};

const FullScreenLoader = styled(Box)(() => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const Loading: FC<LoadingProps> = ({ message = "Loading...", fullScreen }) => {
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
