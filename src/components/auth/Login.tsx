import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';

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

  return (
    <StyledWrapperBox>
      <StyledFormBox>
        <StyledInput
          label={t('emailPlaceholder')}
          variant="filled"
          helperText=" "
          InputProps={{ disableUnderline: true }}
        />
        <StyledInput
          label={t('passwordPlaceholder')}
          variant="filled"
          helperText=" "
          type="password"
          InputProps={{ disableUnderline: true }}
        />

        <StyledButton variant="contained" color="secondary" disableFocusRipple>
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
