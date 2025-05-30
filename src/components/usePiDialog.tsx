import { ReactNode, useState } from "react";


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
