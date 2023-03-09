import { Typography } from '@mui/material';
import notFoundPageText from 'assets/images/notFoundPage.svg';
import { StyledAppTitled, StyledContainer } from 'components/auth/styles';

export const NotFoundPage = () => {
  return (
    <StyledContainer>
      <StyledAppTitled component="img" src={notFoundPageText} />
      <Typography>{'Page not found'}</Typography>
    </StyledContainer>
  );
};
