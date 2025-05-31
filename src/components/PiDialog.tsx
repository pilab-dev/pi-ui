import { Close } from "@mui/icons-material";
import { Box, Dialog, Divider, IconButton, Typography } from "@mui/material";
import { createContext, PropsWithChildren, useContext } from "react";
import { usePiDialog } from "./usePiDialog";

const dialogContext = createContext<PiDialogHook | null>(null);

export type PiDialogHook = ReturnType<typeof usePiDialog>;

export const PiDialogProvider: React.FC<PropsWithChildren<PiDialogHook>> = ({ children, ...dialog }) => {
  return (
    <dialogContext.Provider value={dialog}>
      {children}
      <PiDialog />
    </dialogContext.Provider>
  );
};

export const usePiDialogContext = () => {
  const ctx = useContext(dialogContext);

  if (!ctx) {
    throw new Error("usePiDialogContext must be wrapped with PiDialogProvider");
  }

  return ctx;
};

export const PiDialog = () => {
  const { icon, open, content, title, noSoftClose, fullScreen, onClose } = usePiDialogContext();

  return (
    <Dialog open={open} onClose={noSoftClose ? undefined : onClose} fullWidth fullScreen={fullScreen} maxWidth="md">
      <Box minHeight="60vh" flex={1} display="flex" flexDirection="column">
        <Box display="flex" m={2} flexDirection="row" gap={1}>
          {icon}
          {title && (
            <Typography fontSize="1.2em" fontWeight="normal">
              {title}
            </Typography>
          )}
          <Typography fontSize="1.2em" sx={{ opacity: ".8" }}>
            {title}
          </Typography>
          <Box flex={1} />

          {onClose && (
            <IconButton onClick={onClose} size="small">
              <Close fontSize="small" />
            </IconButton>
          )}
        </Box>

        <Divider variant="fullWidth" />

        {open && content}
      </Box>
    </Dialog>
  );
};

export default PiDialog;

