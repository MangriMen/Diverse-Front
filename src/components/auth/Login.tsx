import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import diverseText from 'assets/images/diverseText.svg';

import {
  StyledFormContainer,
  StyledBox,
  StyledButton,
  StyledContainer,
  StyledFormBox,
  StyledInput,
  StyledTextButton,
} from './styles';

export const Login = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  return (
    <StyledContainer maxWidth="lg">
      <StyledBox>
        <StyledFormContainer>
          <Box component="img" src={diverseText} width="305px" alt="Diverse" />
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

            <StyledButton variant="contained">{t('logIn')}</StyledButton>
            <Typography align="center">{t('youDontHaveAnAccount')}</Typography>
          </StyledFormBox>
        </StyledFormContainer>
        <StyledTextButton variant="text" disableRipple>
          {t('signUp')}
        </StyledTextButton>
      </StyledBox>
    </StyledContainer>
  );
};
