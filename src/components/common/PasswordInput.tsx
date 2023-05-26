import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FilledTextFieldProps,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { StyledInput } from 'components/auth/styles';
import { forwardRef, useState } from 'react';

export interface PasswordInputProps
  extends Omit<FilledTextFieldProps, 'variant'> {
  withShow?: boolean;
}

export const PasswordInput = forwardRef<HTMLDivElement, PasswordInputProps>(
  function PasswordInput({ withShow, ...props }: PasswordInputProps, ref) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(show => !show);

    return (
      <StyledInput
        variant="filled"
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          disableUnderline: true,
          endAdornment: withShow ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
                size="small"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : undefined,
        }}
        {...props}
      />
    );
  },
);
