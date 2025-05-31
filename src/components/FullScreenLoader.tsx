import { Box, BoxProps } from "@mui/material";

const FullScreenLoader = (props: BoxProps) => {
  return (
    <Box
      {...props}
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...props.sx,
      }}
    />
  );
};

export default FullScreenLoader;
