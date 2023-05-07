import { Typography } from '@mui/material';
import notFoundPageText from 'assets/images/notFoundPage.svg';
import { StyledAppTitled } from 'components/auth/styles';

import { CenterLayout, StyledContainer } from './styles';

export const NotFoundPage = () => {
  return (
    <StyledContainer>
      <CenterLayout>
        <StyledAppTitled component="img" src={notFoundPageText} />
        <Typography>{'Page not found'}</Typography>
      </CenterLayout>
    </StyledContainer>
  );
};
