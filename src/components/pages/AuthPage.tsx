import { Box } from '@mui/material';
import diverseText from 'assets/images/diverseText.svg';
import { Login } from 'components/auth/Login';
import { Register } from 'components/auth/Register';
import { StyledAppTitled, StyledFormContainer } from 'components/auth/styles';
import { useCallback, useState } from 'react';

import { CenterLayout, StyledContainer } from './styles';

export const AuthPage = () => {
  const [isLogin, setLogin] = useState(true);

  const changeComponentType = useCallback(() => {
    setLogin(!isLogin);
  }, [isLogin]);

  return (
    <StyledContainer maxWidth="lg">
      <CenterLayout>
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
      </CenterLayout>
    </StyledContainer>
  );
};
