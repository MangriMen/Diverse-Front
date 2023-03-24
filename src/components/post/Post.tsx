import { CardMedia } from '@mui/material';

import { PostCardActions } from './PostCardActions';
import { PostCardComments } from './PostCardComments';
import { PostCardDescription } from './PostCardDescription';
import { PostCardHeader } from './PostCardHeader';
import { PostCardInput } from './PostCardInput';
import { StyledCard, StyledCardContent } from './styles';

export const Post = () => {
  return (
    <StyledCard>
      <CardMedia component="img" image="src/assets/images/500.jpg" />
      <StyledCardContent>
        <PostCardHeader />
        <PostCardDescription />
        <PostCardActions />
        <PostCardComments />
        <PostCardInput />
      </StyledCardContent>
    </StyledCard>
  );
};
