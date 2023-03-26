import { Container } from '@mui/material';
import { Post } from 'components/post/Post';

import { StyledContainer } from './styles';

export const HomePage = () => {
  return (
    <StyledContainer>
      <Post />
    </StyledContainer>
  );
};
