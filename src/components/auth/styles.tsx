import { Box, Button, Container, TextField, styled } from '@mui/material';

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
`;

export const StyledInput = styled(TextField)`
  & .MuiFilledInput-root {
    border-radius: 4;
    background-color: ${props => props.theme.palette.common.third};
    border-bottom: 2px solid;
    border-color: ${props => props.theme.palette.secondary.main};
    &.Mui-Focused {
      background-color: ${props => props.theme.palette.primary.dark};
    }
  }
  & .MuiFormLabel-root.Mui-focused {
    color: ${props => props.theme.palette.secondary.main};
  }
`;

export const StyledFormBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledFormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  gap: clamp(4rem, 3.229813664596273rem + 4.968944099378882vw, 8rem);
`;

export const StyledTextButton = styled(Button)`
  color: ${props => props.theme.palette.secondary.main};
  font-size: 16px;
  padding: 0 4px;
  &:hover {
    background: #ffffff0f;
  }
  ,
  &:focus-visible {
    outline: 2px solid;
    outline-color: white;
  }
`;

export const StyledButton = styled(Button)`
  padding: 4px 16px;
  font-size: 18px;
  &:focus-visible {
    outline: 2px solid;
  }
`;

export const StyledSwitchActionBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledWrapperBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledAppTitled = styled(Box)`
  width: clamp(15.5rem, 13.430124223602483rem + 13.354037267080745vw, 26.25rem);
` as typeof Box;
