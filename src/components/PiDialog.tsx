import { Close } from "@mui/icons-material";
import { Box, Dialog, Divider, IconButton, Typography } from "@mui/material";
import { createContext, FC, PropsWithChildren, ReactNode, useContext, useState } from "react";

const dialogContext = createContext<PiDialogHook | null>(null);

type PiDialogHook = ReturnType<typeof usePiDialog>;

export const PiDialogProvider: FC<PropsWithChildren<PiDialogHook>> = ({ children, ...dialog }) => {
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

type PiDialogHookProps = {
  onClose?: () => void;
  noSoftClose?: boolean;
  icon?: ReactNode;
  title?: ReactNode;
  content: ReactNode;
  fullScreen?: boolean;
};

export const usePiDialog = ({
  icon,
  title,
  noSoftClose,
  content,
  fullScreen: initialFullScreen,
  onClose,
}: PiDialogHookProps) => {
  const [open, setOpen] = useState(false);
  const [fullScreen, setFullscreen] = useState(initialFullScreen);

  const show = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  const toggleFullscreen = () => {
    setFullscreen((v) => !v);
  };

  return {
    icon,
    onClose: onClose || close,
    open,
    show,
    close,
    toggleFullscreen,
    fullScreen,
    noSoftClose,
    content,
    title,
  };
};
