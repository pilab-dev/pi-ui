import { Checkbox, FormControlLabel, FormControlLabelProps } from "@mui/material";
import { FormikContextType } from "formik";
import { FC } from "react";

type PiCheckboxProps<T = any> = {
  formik: FormikContextType<T>;
  label: string;
  property: keyof T;
} & Partial<FormControlLabelProps>;

export const PiCheckbox: FC<PiCheckboxProps> = ({ label, property, formik, ...props }) => {
  return (
    <FormControlLabel
      id={property as string}
      name={property as string}
      onChange={formik.handleChange}
      checked={Boolean(formik.values[property])}
      label={label}
      {...props}
      control={<Checkbox />}
    />
  );
};
