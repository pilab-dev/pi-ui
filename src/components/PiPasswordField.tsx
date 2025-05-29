import { IconButton, InputAdornment } from "@mui/material";
import { FC, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PiTextField, PiTextFieldProps } from "./PiTextField";

export type PiPasswordFieldProps = PiTextFieldProps;

export const PiPasswordField: FC<PiPasswordFieldProps> = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <PiTextField
      {...props}
      InputProps={{
        type: showPassword ? "text" : "password",
        endAdornment: (
          <InputAdornment position="end" onClick={() => setShowPassword(!showPassword)}>
            <IconButton size="small">{showPassword ? <FaEyeSlash /> : <FaEye />}</IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
