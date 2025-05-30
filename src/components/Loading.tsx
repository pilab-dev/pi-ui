import { Box, CircularProgress, styled, Typography } from "@mui/material";
import { FC } from "react";

type LoadingProps = {
  message?: string;
  fullScreen?: boolean;
};

export const FullScreenLoader = styled(Box)(() => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const Loading = ({ message = "Loading...", fullScreen }: LoadingProps) => {
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
