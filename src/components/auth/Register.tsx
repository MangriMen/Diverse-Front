import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  StyledFormContainer,
  StyledBox,
  StyledButton,
  StyledContainer,
  StyledFormBox,
  StyledInput,
} from './styles';

export const Register = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  return (
    <StyledContainer maxWidth="lg">
      <StyledBox>
        <StyledFormContainer>
          <Typography variant="h1">{'Diverse'}</Typography>

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

            <StyledButton variant="contained">{t('signUp')}</StyledButton>
            <Typography align="center">
              {t('youAlreadyHaveAnAccount')}
            </Typography>
          </StyledFormBox>
        </StyledFormContainer>

        <Button variant="text">{t('logIn')}</Button>
      </StyledBox>
    </StyledContainer>
  );
};
