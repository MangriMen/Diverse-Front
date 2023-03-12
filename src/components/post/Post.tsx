import { CardMedia } from '@mui/material';

import { StyledCard, StyledCardContent } from './styles';
import { PostCardHeader } from './PostCardHeader';
import { PostCardDescription } from './PostCardDescription';
import { PostCardActions } from './PostCardActions';
import { PostCardComments } from './PostCardComments';
import { PostCardInput } from './PostCardInput';

export const Post = () => {
  return (
    <StyledCard>
      <CardMedia
        component="img"
        image="src/assets/images/500.jpg"
        sx={{ width: 500 }}
      ></CardMedia>
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
