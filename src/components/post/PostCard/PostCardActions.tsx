import { StyledActionBox as PostActions, PostProps } from 'components/post';
import { PostLike } from 'components/post/Like';

import { ShareButton } from './ShareButton';

export const PostCardActions = ({ post }: PostProps) => {
  return (
    <PostActions>
      <ShareButton post={post} />
      <PostLike post={post} />
    </PostActions>
  );
};
