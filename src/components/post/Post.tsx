import { Button } from '@mui/material';

import { PostCard } from './PostCard';
import { PostProps } from './interfaces';

export const Post = ({ post, size = 'default' }: PostProps) => {
  switch (size) {
    case 'default':
      return <PostCard post={post} size={size} />;
    case 'small':
      return (
        <Button>
          <PostCard post={post} size={size} />
        </Button>
      );
  }
};
