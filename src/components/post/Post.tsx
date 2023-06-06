import { PostProps } from 'components/post';
import { useState } from 'react';

import { PostCardActions } from './PostCard/PostCardActions';
import { PostCardComments } from './PostCard/PostCardComments';
import { PostCardDescription } from './PostCard/PostCardDescription';
import { PostCardHeader } from './PostCard/PostCardHeader';
import { PostCardInput } from './PostCard/PostCardInput';
import { PostCardMedia } from './PostCard/PostCardMedia';
import {
  PostCardActionArea,
  PostCardContent,
  PostCardHidingContent,
  PostCardStyled,
} from './PostCard/styles';

export const Post = ({ post, size = 'default' }: PostProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <PostCardStyled size={size} elevation={0}>
      <PostCardActionArea>
        <PostCardMedia size={size} image={post.content} />
      </PostCardActionArea>
      {size === 'default' && (
        <PostCardContent size={size}>
          <PostCardHeader post={post} />
          <PostCardDescription
            expanded={expanded}
            onExpand={handleExpandClick}
            description={post.description}
          />
          <PostCardHidingContent visible={!expanded}>
            <PostCardActions post={post} />
            <PostCardComments post={post} />
            <PostCardInput post={post} />
          </PostCardHidingContent>
        </PostCardContent>
      )}
    </PostCardStyled>
  );
};
