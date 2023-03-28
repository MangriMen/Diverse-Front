import { Box } from '@mui/material';
import { post } from 'mocks/mockPosts';

import { PostCardActions } from './PostCardActions';
import { PostCardComments } from './PostCardComments';
import { PostCardDescription } from './PostCardDescription';
import { PostCardHeader } from './PostCardHeader';
import { PostCardInput } from './PostCardInput';
import {
  StyledCard,
  StyledCardContent,
  StyledCardMedia,
  StyledCardMediaBox,
} from './styles';

export const Post = () => {
  return (
    <StyledCard>
      <StyledCardMediaBox>
        <StyledCardMedia component="img" image={post.content} />
      </StyledCardMediaBox>
      <StyledCardContent gap="0.5rem">
        <PostCardHeader />
        <PostCardDescription />
        <PostCardActions />
        <PostCardComments />
        <PostCardInput />
      </StyledCardContent>
    </StyledCard>
  );
};
