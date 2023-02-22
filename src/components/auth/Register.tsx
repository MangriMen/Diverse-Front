import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';

import {
  StyledFormBox,
  StyledInput,
  StyledTextButton,
  StyledSwitchActionBox,
  StyledWrapperBox,
} from './styles';
import { AuthFormProps } from './interfaces';

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

        <Button variant="contained" color="secondary">
          {t('signUp')}
        </Button>
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
