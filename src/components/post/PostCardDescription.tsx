import { Typography } from '@mui/material';
import { post } from 'mocks/mockPosts';

export const PostCardDescription = () => {
  return (
    <Typography fontSize="14px" padding="0 4px">
      {post.description}
    </Typography>
  );
};
