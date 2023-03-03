import notFoundPageText from 'assets/images/notFoundPage.svg';
import { StyledAppTitled, StyledContainer } from 'components/auth/styles';

export const NotFoundPage = () => {
  return (
    <StyledContainer>
      <StyledAppTitled component="img" src={notFoundPageText} />
    </StyledContainer>
  );
};
