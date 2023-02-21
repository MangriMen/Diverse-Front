import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const StyledInput = styled(TextField)({
  '& .MuiFilledInput-root': {
    borderRadius: 4,
    backgroundColor: '#141618',
    borderBottom: '2px solid #4f84c0',
    color: '#d9d9d9',
  },
  '& .MuiFormLabel-root': {
    color: '#d9d9d9',
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color: '#4f84c0',
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#4f84c0',
  '&:hover': {
    backgroundColor: '3073bf',
  },
});

export const Login = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  return (
    <Container maxWidth="lg" sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h1" fontWeight="bold" sx={{ mb: '1rem' }}>
            {'Diverse'}
          </Typography>

          <StyledInput
            label={t('emailPlaceholder')}
            variant="filled"
            sx={{ mb: '1rem' }}
            InputProps={{ disableUnderline: true }}
          />
          <StyledInput
            label={t('passwordPlaceholder')}
            variant="filled"
            sx={{ mb: '1rem' }}
            InputProps={{ disableUnderline: true }}
          />

          <StyledButton variant="contained" sx={{ mb: '1rem' }}>
            {t('logIn')}
          </StyledButton>
          <Typography align="center">{t('youDontHaveAnAccount')}</Typography>
          <Button variant="text" sx={{ padding: '0' }}>
            {t('signUp')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
