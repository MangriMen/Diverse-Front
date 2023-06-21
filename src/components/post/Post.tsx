import { Box } from '@mui/material';
import { PostProps } from 'components/post';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  PostCardMediaWrapper,
  PostCardStyled,
} from './PostCard/styles';

export const Post = ({ post, size = 'default' }: PostProps) => {
  const isDisplayContentButton = size !== 'fullscreen';
  const isDisplayContent = size === 'fullscreen' || size === 'default';

  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleContentClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <PostCardStyled size={size} elevation={0}>
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        gap="0.5rem"
      >
        {size === 'default' && <PostCardHeader post={post} />}
        <PostCardMediaWrapper size={size}>
          {isDisplayContentButton && (
            <PostCardActionArea onClick={handleContentClick}>
              <PostCardMedia size={size} image={post.content} />
            </PostCardActionArea>
          )}
          {!isDisplayContentButton && (
            <PostCardMedia size={size} image={post.content} />
          )}
        </PostCardMediaWrapper>
      </Box>
      {isDisplayContent && (
        <PostCardContent size={size}>
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
