import { CardActionArea } from '@mui/material';
import { useState } from 'react';

import { PostProps } from '../interfaces';
import { StyledCard, StyledCardContent } from '../styles';
import { PostCardActions } from './PostActions';
import { PostCardMeida } from './PostCardMeida';
import { PostCardComments } from './PostComments';
import { PostCardDescription } from './PostDescription';
import { PostCardHeader } from './PostHeader';
import { PostCardInput } from './PostInput';

export const PostCard = ({ post, setPost, size = 'default' }: PostProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <StyledCard size={size} elevation={0}>
      <CardActionArea sx={{ width: '100%', height: '100%' }}>
        <PostCardMeida size={size} image={post.content} />
      </CardActionArea>
      {size === 'default' && (
        <StyledCardContent size={size}>
          {size === 'default' && <PostCardHeader post={post} />}
          {post.description && (
            <PostCardDescription
              expanded={expanded}
              onExpand={handleExpandClick}
              size={size}
              description={post.description}
            />
          )}
          {size === 'default' && !expanded && (
            <>
              <PostCardActions post={post} setPost={setPost} />
              <PostCardComments post={post} setPost={setPost} />
              <PostCardInput post={post} setPost={setPost} />
            </>
          )}
        </StyledCardContent>
      )}
    </StyledCard>
  );
};
