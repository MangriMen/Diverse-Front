import { Post } from 'components/post/Post';
import { post, post2 } from 'mocks/mockPosts';

import { StyledContainer } from './styles';

export const HomePage = () => {
  return (
    <StyledContainer>
      <Post post={post} />
      <Post post={post2} />
    </StyledContainer>
  );
};
