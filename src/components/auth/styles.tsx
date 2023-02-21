import { Box, Button, Container, TextField, styled } from '@mui/material';

export const StyledContainer = styled(Container)({
  height: '100%',
});

export const StyledInput = styled(TextField)({
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

export const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

export const StyledFormBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const StyledFormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '5rem',
});

export const StyledButton = styled(Button)({
  backgroundColor: '#4f84c0',
  '&:hover': {
    backgroundColor: '#3073bf',
  },
});

export const StyledTextButton = styled(Button)({
  padding: 'none',
});
