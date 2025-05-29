import { Check, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  lighten,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
// import ServerIcon from "../components/icons/ServerIcon";

const ServerIcon = ({ color }: { color: string }) => {
  return <></>;
};

interface IWizardStep {
  title: string | React.ReactNode;
  label: string;
  isInvalid?: boolean;
  isComplete?: boolean;
  icon?: ReactNode;
  component: ReactNode;
}

type WizardHookProps<T> = {
  steps: IWizardStep[];
  /**
   * Disables the wizzard's moveTo method.
   */
  disableMove?: boolean;

  initialData: T;
};

type Values = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useWizard<T extends Values = Values>({
  initialData,
  steps: wsteps,
  disableMove,
}: WizardHookProps<Values>) {
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([...wsteps]);

  const [data, setData] = useState<Values>(initialData);

  const complete = async () => {
    validate();

    if (hasNext()) {
      setActiveStep((current) => current + 1);
    }
  };

  const validate = () => {
    const currentStep = steps[activeStep];
    currentStep.isComplete = true;
    currentStep.isInvalid = undefined;

    const newSteps = [...steps];
    newSteps.splice(activeStep, 1, currentStep);

    setSteps(newSteps);
  };

  const invalidate = () => {
    const currentStep = steps[activeStep];
    currentStep.isComplete = false;
    currentStep.isInvalid = true;

    const newSteps = [...steps];
    newSteps.splice(activeStep, 1, currentStep);

    setSteps(newSteps);
  };

  const next = () => {
    if (hasNext()) {
      setActiveStep((current) => current + 1);
    }
  };

  const back = () => {
    if (hasPrevious()) {
      setActiveStep((current) => current - 1);
    }
  };

  const moveTo = (v: number) => {
    if (!disableMove) {
      setActiveStep(v);
    }
  };

  const updateData = (dataSegment: Partial<T>) => {
    setData((state) => ({ ...state, ...dataSegment }));
  };

  const hasPrevious = () => activeStep != 0;
  const hasNext = () => activeStep !== steps.length - 1;

  const { title, label, isComplete, isInvalid } = steps[activeStep];

  return useMemo(
    () => ({
      steps,
      title,
      isComplete,
      isInvalid,
      label,
      activeStep,
      moveTo,
      hasNext,
      hasPrevious,
      complete,
      invalidate,
      validate,
      next,
      back,
      data,
      updateData,
      component: steps[activeStep].component,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeStep, steps]
  );
}

type WizzardHook = ReturnType<typeof useWizard>;

type WizardProps = {
  title?: string;
  wizard: WizzardHook;
  open: boolean;
  icon?: ReactNode;
  finishLabel?: string;
  // pages: ReactNode[];
  onClose?: () => void;
};

type WizardFooterProps = {
  buttons?: ReactElement;
  footer?: ReactElement;
  finishLabel?: string;
  nextLabel?: string;
  backLabel?: string;
  nextDisable?: boolean;
  prevDisable?: boolean;
  onNext?: () => Promise<void> | void;
  onFinish?: () => Promise<void> | void;
};

export const WizardPanel: FC<PropsWithChildren<WizardFooterProps>> = ({ children, ...props }) => {
  return (
    <Box flex={1} display="flex" flexDirection="column">
      {children}

      <Box flex={1}></Box>
      <Divider />
      <Box m={1} display="flex" alignItems="center" flexDirection="row" justifyContent="flex-end">
        <WizardFooter {...props} />
      </Box>
    </Box>
  );
};

export const WizardFooter: FC<WizardFooterProps> = ({
  finishLabel = "Finish",
  nextDisable,
  prevDisable,
  onNext,
  onFinish,
  footer,
}) => {
  const wizard = useWizardContext();

  return (
    <>
      {footer || (
        <Typography fontSize="15px" fontWeight={300}>
          Current page is {wizard.activeStep + 1} of {wizard.steps.length}
        </Typography>
      )}
      <div style={{ flex: 1 }} />
      <Button disabled={!wizard.hasPrevious() || prevDisable} type="button" size="small" onClick={wizard.back}>
        Back
      </Button>
      <Button disabled={!wizard.hasNext() || nextDisable} type="button" size="small" onClick={onNext || wizard.next}>
        Next
      </Button>
      {!wizard.hasNext() && (
        <Button type="button" size="small" onClick={onFinish}>
          {finishLabel}
        </Button>
      )}
    </>
  );
};

const wizardContext = createContext<WizzardHook | null>(null);

export const useWizardContext = () => {
  const ctx = useContext(wizardContext);
  if (!ctx) {
    throw new Error("useWizzardContext must be wrapped with Wizzard component");
  }

  return ctx;
};

const WizardStepComponent = ({ step, idx, wizard }: { step: IWizardStep; idx: number; wizard: WizzardHook }) => {
  const theme = useTheme();

  let stepColor = "#aaa";

  if (step.isComplete) {
    stepColor = theme.palette.success.light;
  }

  if (step.isInvalid) {
    stepColor = theme.palette.error.main;
  }

  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={idx === wizard.activeStep}
        disableRipple
        key={step.label}
        onClick={() => wizard.moveTo(idx)}
        sx={{ whiteSpace: "nowrap", borderLeft: `${stepColor} 4px solid` }}
      >
        <ListItemIcon>{step.icon}</ListItemIcon>
        <ListItemText primary={step.label} />
        <Box flex={1}></Box>
        {step.isComplete && (
          <ListItemIcon sx={{ justifyContent: "flex-end" }}>
            <Check fontSize="small" color="primary" />
          </ListItemIcon>
        )}
        {step.isInvalid && (
          <ListItemIcon sx={{ justifyContent: "flex-end" }}>
            <Close fontSize="small" color="error" />
          </ListItemIcon>
        )}
      </ListItemButton>
    </ListItem>
  );
};

export const Wizard: FC<WizardProps> = ({ title, wizard, open, onClose, icon }) => {
  const theme = useTheme();

  return useMemo(
    () => (
      <Dialog
        open={open}
        fullWidth
        // fullScreen
        maxWidth="md"
      >
        <Box minHeight="60vh" flex={1} display="flex" flexDirection="column">
          <Box display="flex" m={2} flexDirection="row" gap={1}>
            {icon || <ServerIcon color="primary" />}
            {title && (
              <Typography fontSize="1.2em" fontWeight="normal">
                {title} -
              </Typography>
            )}
            <Typography fontSize="1.2em" sx={{ opacity: ".8" }}>
              {wizard.title}
            </Typography>
            <Box flex={1} />

            {onClose && (
              <IconButton onClick={onClose} size="small">
                <Close fontSize="small" />
              </IconButton>
            )}
          </Box>

          <Divider variant="fullWidth" />

          <Box display="flex" flexGrow={1} flexDirection="row" bgcolor={theme.palette.background.paper}>
            <Box
              sx={{
                minWidth: 250,
                borderRight: "#88888833 1px solid",
                background:
                  theme.palette.mode === "light" ? "#cccccc29" : lighten(theme.palette.background.paper, 0.03),
              }}
            >
              <List disablePadding>
                {/* <ListSubheader>Steps</ListSubheader> */}
                {wizard.steps.map((step, idx) => (
                  <WizardStepComponent key={step.label} idx={idx} step={step} wizard={wizard} />
                ))}
              </List>
            </Box>
            {/* This is a content box */}

            <wizardContext.Provider value={wizard}>
              <>{wizard.component}</>
            </wizardContext.Provider>
          </Box>
        </Box>
      </Dialog>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wizard.activeStep, wizard.isComplete, wizard.isInvalid, open]
  );
};

export default Wizard;
