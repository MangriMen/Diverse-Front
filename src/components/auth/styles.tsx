import { Box, Button, Container, TextField, styled } from '@mui/material';

export const StyledContainer = styled(Container)({
  height: '100%',
});

export const StyledInput = styled(TextField)(({ theme }) => ({
  '& .MuiFilledInput-root': {
    borderRadius: 4,
    backgroundColor: theme.palette.common.third,
    // backgroundColor: '#141618',
    borderBottom: '2px solid',
    borderColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
  },
  '& .MuiFormLabel-root': {
    color: theme.palette.primary.main,
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color: theme.palette.secondary.main,
  },
}));

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

export const StyledTextButton = styled(Button)(({ theme }) => ({
  padding: '0',
  color: theme.palette.secondary.main,
  fontSize: '16px',
  '&:hover': {
    background: 'none',
  },
  '&:focus-visible': {
    padding: '0 4px',
    outline: '2px solid',
  },
}));

export const StyledSwitchActionBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const StyledWrapperBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});
