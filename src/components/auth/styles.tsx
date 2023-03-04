import { Box, Button, Container, TextField, styled } from '@mui/material';

export const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100%',
});

export const StyledInput = styled(TextField)(({ theme }) => ({
  '& .MuiFilledInput-root': {
    borderRadius: 4,
    backgroundColor: theme.palette.common.third,
    borderBottom: '2px solid',
    borderColor: theme.palette.secondary.main,
    '&.Mui-focused': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color: theme.palette.secondary.main,
  },
}));

export const StyledFormBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const StyledFormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '8px 0',
  gap: 'clamp( 4rem, 3.229813664596273rem + 4.968944099378882vw, 8rem )',
});

export const StyledTextButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: '16px',
  padding: '0 4px',
  '&:hover': {
    background: '#ffffff0f',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'white',
  },
}));

export const StyledButton = styled(Button)({
  padding: '4px 16px',
  fontSize: '18px',
  '&:focus-visible': {
    outline: '2px solid',
  },
});

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

export const StyledAppTitled = styled(Box)({
  width:
    'clamp( 15.5rem, 13.430124223602483rem + 13.354037267080745vw, 26.25rem )',
}) as typeof Box;
