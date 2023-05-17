import { FilledTextFieldProps, InputAdornment } from '@mui/material';
import { StyledInput } from 'components/auth/styles';
import { AT_THE_RATE_SIGN } from 'consts';
import { forwardRef } from 'react';

export type UsernameInputProps = Omit<FilledTextFieldProps, 'variant'>;

export const UsernameInput = forwardRef<HTMLDivElement, UsernameInputProps>(
  function UsernameInput({ ...props }: UsernameInputProps, ref) {
    return (
      <StyledInput
        ref={ref}
        variant="filled"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{AT_THE_RATE_SIGN}</InputAdornment>
          ),
          disableUnderline: true,
        }}
        {...props}
      />
    );
  },
);
