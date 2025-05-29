import { Alert, AlertTitle, Box, Divider, Typography } from "@mui/material";
import { useWizardContext, WizardFooter } from "./";
import { FormikContextType } from "formik";
import { FC, PropsWithChildren, ReactElement, useEffect, useMemo } from "react";

type WizardFormPanelProps = {
  formik: FormikContextType<unknown>;
  showWarnings?: boolean;
  customErrorComponent?: ReactElement;
};

export const WizardFormPanel: FC<PropsWithChildren<WizardFormPanelProps>> = ({
  children,
  formik,
  showWarnings = false,
  customErrorComponent,
}) => {
  const wizard = useWizardContext();

  useEffect(() => {
    if (!formik.isValid) {
      wizard.invalidate();
      return;
    }

    wizard.validate();
  }, [formik.isValid, wizard]);

  useEffect(() => {
    wizard.updateData(formik.values);
  }, [formik.values, wizard]);

  const getFormErrors = useMemo(() => {
    const errors = Object.entries(formik.errors).map(([key, error]) => ({
      key,
      error: error as string,
    }));
    const warnings = showWarnings
      ? Object.entries(formik.touched)
          .filter(([key]) => !formik.values[key])
          .map(([key]) => ({ key }))
      : [];

    return {
      errors,
      warnings,
    };
  }, [formik.errors, formik.touched, formik.values, showWarnings]);

  const footer = useMemo(() => {
    if (customErrorComponent) {
      return customErrorComponent;
    }

    const { errors, warnings } = getFormErrors;

    if (errors.length > 0) {
      return (
        <Alert severity="error" sx={{ width: "100%" }}>
          <AlertTitle>Form Errors</AlertTitle>
          {errors.map(({ key, error }) => (
            <Typography key={key} color="error" variant="body2">
              {error}
            </Typography>
          ))}
        </Alert>
      );
    }

    if (warnings.length > 0) {
      return (
        <Alert severity="warning" sx={{ width: "100%" }}>
          <AlertTitle>Required Fields</AlertTitle>
          {warnings.map(({ key }) => (
            <Typography key={key} variant="body2">
              {key} is required
            </Typography>
          ))}
        </Alert>
      );
    }

    return null;
  }, [getFormErrors, customErrorComponent]);

  const footerElement = footer as ReactElement;

  return (
    <Box flex={1} display="flex" flexDirection="column">
      {children}

      <Box flex={1}></Box>
      <Divider />
      <Box m={1} display="flex" alignItems="center" flexDirection="row" justifyContent="flex-end">
        <WizardFooter nextDisable={!formik.isValid || formik.isSubmitting} footer={footerElement} />
      </Box>
    </Box>
  );
};
