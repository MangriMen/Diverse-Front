import { Box } from '@mui/material';
import diverseText from 'assets/images/diverseText.svg';
import { Login } from 'components/auth/Login';
import { Register } from 'components/auth/Register';
import {
  StyledFormContainer,
  StyledBox,
  StyledContainer,
} from 'components/auth/styles';
import { useCallback, useState } from 'react';

export const AuthPage = () => {
  const [isLogin, setLogin] = useState(true);

  const changeComponentType = useCallback(() => {
    setLogin(!isLogin);
  }, [isLogin]);

  return (
    <StyledContainer maxWidth="lg">
      <StyledBox>
        <StyledFormContainer>
          <Box component="img" src={diverseText} width="305px" alt="Diverse" />
          {isLogin ? (
            <Login changeFormType={changeComponentType} />
          ) : (
            <Register changeFormType={changeComponentType} />
          )}
        </StyledFormContainer>
      </StyledBox>
    </StyledContainer>
  );
};
