import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { FormikContextType } from "formik";
import { ReactElement, useEffect, useState } from "react";
import { Loading } from "./Loading";

export interface PiSelectItem {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: ReactElement;
}

type PiSelectProps<T = any> = {
  property: string & keyof T;
  label?: string;
  formik: FormikContextType<T>;
  helperText?: string;
  items: PiSelectItem[];
  required?: boolean;
  value?: unknown;
};

export const PiSelect: React.FC<PiSelectProps> = ({ formik, property, label, value, items, helperText = " ", required }) => {
  return (
    <Box display="flex" flexDirection="column" gap="1">
      {label && (
        <InputLabel error={Boolean(formik.errors[property])} htmlFor={property} required={required}>
          {label}:
        </InputLabel>
      )}
      <FormControl required variant="outlined" fullWidth>
        <Select
          displayEmpty
          id={property}
          name={property}
          onChange={formik.handleChange}
          value={value === "" ? value : value || formik.values[property]}
        >
          {items.map((item) => (
            <MenuItem disabled={item.disabled} key={item.value} value={item.value}>
              <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                {item.icon}
                {item.label}
              </Box>
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={Boolean(formik.errors[property])}>
          {(formik.errors[property] as string) || helperText}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

type PiSelectAsyncProps<T = any> = {
  loader: () => Promise<PiSelectItem[]>;
  disableReload?: boolean;
  loadingText?: string;
} & Omit<PiSelectProps<T>, "items">;

export const PiSelectAsync: React.FC<PiSelectAsyncProps> = ({ loader, loadingText, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState<PiSelectItem[]>([]);
  const [loadError, setLoadError] = useState<string>("");

  const reload = async () => {
    setLoaded(false);
    try {
      const items = await loader();
      setItems(items);
      setLoaded(true);
    } catch {
      setLoadError("failed to load data");
    }
  };

  useEffect(() => {
    reload();
    setLoadError("");
  }, [loader, reload]);

  if (loadError) return <Typography>Failed to load data...</Typography>;

  if (loaded) {
    return <PiSelect {...props} items={items} />;
  }

  return (
    <Box display="flex" flexDirection="column" gap="1">
      {props.label && (
        <InputLabel htmlFor={props.property} required={props.required}>
          {props.label}:
        </InputLabel>
      )}
      <FormControl required variant="outlined" fullWidth>
        <Select displayEmpty value="loading">
          <MenuItem disabled value="loading">
            <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
              <Loading message={loadingText || "Waiting for data..."} />
            </Box>
          </MenuItem>
        </Select>
        <FormHelperText>{props.helperText || " "}</FormHelperText>
      </FormControl>
    </Box>
  );
};
