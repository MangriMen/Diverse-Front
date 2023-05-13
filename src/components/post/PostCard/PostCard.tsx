import { Box } from '@mui/material';
import { PostProps } from 'components/post';
import { useState } from 'react';

import { PostCardActions } from './PostCardActions';
import { PostCardComments } from './PostCardComments';
import { PostCardDescription } from './PostCardDescription';
import { PostCardHeader } from './PostCardHeader';
import { PostCardInput } from './PostCardInput';
import { PostCardMeida } from './PostCardMeida';
import { PostCardActionArea, PostCardContent, PostCardStyled } from './styles';

export const PostCard = ({ post, setPost, size = 'default' }: PostProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <PostCardStyled size={size} elevation={0}>
      <PostCardActionArea>
        <PostCardMeida size={size} image={post.content} />
      </PostCardActionArea>
      {size === 'default' && (
        <PostCardContent size={size}>
          <PostCardHeader post={post} />
          <PostCardDescription
            expanded={expanded}
            onExpand={handleExpandClick}
            description={post.description}
          />
          <Box
            display="flex"
            flexDirection="column"
            overflow="hidden"
            visibility={expanded ? 'hidden' : 'visible'}
            gap="inherit"
          >
            <PostCardActions post={post} setPost={setPost} />
            <PostCardComments post={post} setPost={setPost} />
            <PostCardInput post={post} setPost={setPost} />
          </Box>
        </PostCardContent>
      )}
    </PostCardStyled>
  );
};
