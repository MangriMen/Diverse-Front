import { Button, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { FormContainer, StyledBox, StyledButton, StyledInput } from './styles';

export const Register = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  return (
    <Container maxWidth="lg" sx={{ height: '100%' }}>
      <StyledBox>
        <FormContainer>
          <Typography variant="h1" fontWeight="bold">
            {'Diverse'}
          </Typography>

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
          <Typography align="center">{t('youDontHaveAnAccount')}</Typography>
        </FormContainer>

        <Button variant="text">{t('logIn')}</Button>
      </StyledBox>
    </Container>
  );
};
