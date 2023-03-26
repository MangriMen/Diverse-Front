import { Typography } from '@mui/material';
import { post } from 'mocks/mockPosts';

import { StyledAvatar, StyledPostCardHeaderBox } from './styles';

export const PostCardHeader = () => {
  return (
    <StyledPostCardHeaderBox>
      <StyledAvatar src={post.user.avatar} />
      <Typography fontSize="20px">{post.user.username}</Typography>
    </StyledPostCardHeaderBox>
  );
};
