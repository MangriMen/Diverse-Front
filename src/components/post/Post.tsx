import { PostProps } from 'components/post';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PostCardActions } from './PostCard/PostCardActions';
import { PostCardComments } from './PostCard/PostCardComments';
import { PostCardDescription } from './PostCard/PostCardDescription';
import { PostCardHeader } from './PostCard/PostCardHeader';
import { PostCardInput } from './PostCard/PostCardInput';
import { PostCardMeida } from './PostCard/PostCardMeida';
import {
  PostCardActionArea,
  PostCardContent,
  PostCardHidingContent,
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
      {isDisplayContentButton && (
        <PostCardActionArea onClick={handleContentClick}>
          <PostCardMeida size={size} image={post.content} />
        </PostCardActionArea>
      )}
      {!isDisplayContentButton && (
        <PostCardMeida size={size} image={post.content} />
      )}
      {isDisplayContent && (
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
