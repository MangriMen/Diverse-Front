import { Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthFormProps } from './interfaces';
import {
  StyledButton,
  StyledFormBox,
  StyledInput,
  StyledSwitchActionBox,
  StyledTextButton,
  StyledWrapperBox,
} from './styles';

export const Register: FC<AuthFormProps> = ({ changeFormType }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  return (
    <StyledWrapperBox>
      <StyledFormBox>
        <StyledInput
          label={t('loginPlaceholder')}
          variant="filled"
          helperText=" "
          InputProps={{ disableUnderline: true }}
        />
        <StyledInput
          label={t('usernamePlaceholder')}
          variant="filled"
          helperText=" "
          InputProps={{ disableUnderline: true }}
        />
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
          {t('signUp')}
        </StyledButton>
      </StyledFormBox>
      <StyledSwitchActionBox>
        <Typography align="center">{t('alreadyHaveAnAccount')}</Typography>

        <StyledTextButton variant="text" disableRipple onClick={changeFormType}>
          {t('logIn')}
        </StyledTextButton>
      </StyledSwitchActionBox>
    </StyledWrapperBox>
  );
};
