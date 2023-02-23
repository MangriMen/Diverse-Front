import { Box } from '@mui/material';
import diverseText from 'assets/images/diverseText.svg';
import { Login } from 'components/auth/Login';
import { Register } from 'components/auth/Register';
import {
  StyledFormContainer,
  StyledContainer,
  StyledAppTitled,
} from 'components/auth/styles';
import { useCallback, useState } from 'react';

export const AuthPage = () => {
  const [isLogin, setLogin] = useState(true);

  const changeComponentType = useCallback(() => {
    setLogin(!isLogin);
  }, [isLogin]);

  return (
    <StyledContainer maxWidth="lg">
      <StyledFormContainer>
        <StyledAppTitled component="img" src={diverseText} alt="Diverse" />
        <Box maxWidth="280px" width="100%">
          {isLogin ? (
            <Login changeFormType={changeComponentType} />
          ) : (
            <Register changeFormType={changeComponentType} />
          )}
        </Box>
      </StyledFormContainer>
    </StyledContainer>
  );
};
