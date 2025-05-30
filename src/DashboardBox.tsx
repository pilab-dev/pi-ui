import {
  Card,
  CardProps,
  LinearProgress,
  Box as MatBox,
  Typography,
} from "@mui/material";
import { PropsWithChildren, ReactElement, ReactNode } from "react";
import { PiErrorBox } from "./components/PiErrorBox";

const PiCard: React.FC<CardProps> = ({ children, ...props }) => {
  //   const theme = useTheme();

  return (
    <Card
      {...props}
      style={{
        // backgroundColor: "#ffffff",
        borderRadius: "3px",
        border: "#24242433 1px solid",
        boxShadow: `0px 2px 1px -1px rgba(0,0,0,0.2),
            0px 1px 1px 0px rgba(0,0,0,0.14),
            0px 1px 3px 0px rgba(0,0,0,0.12)`,
      }}
    >
      {children}
    </Card>
  );
};

type DashboardBoxProps = {
  title?: string;
  actions?: ReactNode;
  draggable?: boolean;
  loading?: boolean;
  width?: number;
  error?: string | ReactElement;
};

const Placeholder = () => <MatBox flex={1} />;

export const DashboardBox: React.FC<PropsWithChildren<DashboardBoxProps>> = ({
  children,
  title,
  actions,
  loading,
  width,
  error,
  // draggable = false,
}) => {
  return (
    <PiCard
      sx={{
        height: "100%",
        minWidth: "250px",
        display: "flex",
        flexDirection: "column",
        fontWeight: "300",
        // fontSize: "14px",
        minHeight: "300px",
        width: width ? `${width}px` : undefined,
      }}
    >
      {loading ? (
        <LinearProgress variant="indeterminate" sx={{ height: "3px" }} />
      ) : (
        <div style={{ height: "3px" }}></div>
      )}
      <MatBox
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        mx={2}
      >
        <Typography py={2} fontSize={"19px"} fontWeight="300">
          {title}
        </Typography>
        <Placeholder />
        {actions}

        {/* <DragHandle /> */}
      </MatBox>

      {error ? <PiErrorBox>{error}</PiErrorBox> : children}
    </PiCard>
  );
};

export default DashboardBox;
