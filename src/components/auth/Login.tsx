import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import { useLoginMutation } from 'ducks/auth/api';
import { API_BASE_URL } from 'consts/endpoints';
import { Controller } from 'react-hook-form';

import {
  StyledFormBox,
  StyledInput,
  StyledTextButton,
  StyledSwitchActionBox,
  StyledWrapperBox,
  StyledButton,
} from './styles';
import { AuthFormProps } from './interfaces';

export const Login: FC<AuthFormProps> = ({ changeFormType }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  const [login] = useLoginMutation();

  console.log(API_BASE_URL);

  return (
    <StyledWrapperBox>
      <StyledFormBox>
        <Controller
          name="email"
          render={({ field }) => (
            <StyledInput
              label={t('emailPlaceholder')}
              variant="filled"
              {...field}
              helperText=" "
              InputProps={{ disableUnderline: true }}
            />
          )}
        />
        <StyledInput
          label={t('passwordPlaceholder')}
          variant="filled"
          helperText=" "
          type="password"
          InputProps={{ disableUnderline: true }}
        />

        <StyledButton
          variant="contained"
          color="secondary"
          disableFocusRipple
          onClick={() => {
            login({ email: 'test2@gmail.com', password: 'password' });
          }}
        >
          {t('logIn')}
        </StyledButton>
      </StyledFormBox>
      <StyledSwitchActionBox>
        <Typography align="center">{t('alreadyHaveAnAccount')}</Typography>

        <StyledTextButton variant="text" disableRipple onClick={changeFormType}>
          {t('signUp')}
        </StyledTextButton>
      </StyledSwitchActionBox>
    </StyledWrapperBox>
  );
};
