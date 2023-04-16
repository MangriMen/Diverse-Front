import { useState } from 'react';

import { PostCardActions } from './PostCardActions';
import { PostCardComments } from './PostCardComments';
import { PostCardDescription } from './PostCardDescription';
import { PostCardHeader } from './PostCardHeader';
import { PostCardInput } from './PostCardInput';
import { PostProps } from './interfaces';
import {
  StyledCard,
  StyledCardContent,
  StyledCardMedia,
  StyledCardMediaBox,
} from './styles';

export const PostCard = ({ post, setPost, size = 'default' }: PostProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <StyledCard size={size} elevation={0}>
      <StyledCardMediaBox size={size}>
        <StyledCardMedia component="img" image={post.content} />
      </StyledCardMediaBox>
      <StyledCardContent size={size}>
        {size === 'default' && <PostCardHeader user={post.user} />}
        <PostCardDescription
          expanded={expanded}
          onExpand={handleExpandClick}
          size={size}
          description={post.description}
        />
        {size === 'default' && !expanded && (
          <>
            <PostCardActions post={post} setPost={setPost} />
            <PostCardComments post={post} setPost={setPost} />
            <PostCardInput post={post} setPost={setPost} />
          </>
        )}
      </StyledCardContent>
    </StyledCard>
  );
};
