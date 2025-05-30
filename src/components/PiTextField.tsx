import { Box, InputLabel, TextField, TextFieldProps } from "@mui/material";
import { FormikContextType } from "formik";
import { FC, JSX } from "react";

export type PiTextFieldProps<T = any> = {
  formik: FormikContextType<T>;
  property: keyof T;
} & TextFieldProps;

export const PiTextField: React.FC<PiTextFieldProps> = ({
  label,
  value,
  formik,
  property,
  helperText = " ",
  // margin,
  ...props
}): JSX.Element => {
  return (
    <Box display="flex" flexDirection="column">
      <InputLabel
        error={formik.touched[property] && Boolean(formik.errors[property])}
        required={props.required}
        htmlFor={`${property}-input-field`}
      >
        {label}:
      </InputLabel>
      <TextField
        fullWidth
        {...props}
        sx={{
          ".MuiInputBase-root": {
            paddingTop: "2.5px",
          },
        }}
        id={`${property}-input-field`}
        name={String(property)}
        value={value || formik.values[property]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[property] && Boolean(formik.errors[property])}
        helperText={(formik.touched[String(property)] && (formik.errors[String(property)] as string)) || helperText}
      />
    </Box>
  );
};
