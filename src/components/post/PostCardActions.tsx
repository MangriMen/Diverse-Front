import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Typography } from '@mui/material';
import { StyledTextButton } from 'components/common/styles';
import { useLikePostMutation, useUnlikePostMutation } from 'ducks/post/api';
import { preparePostToDisplay } from 'helpers/post';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ServerGetPostResponse } from 'types/post';

import { PostProps } from './interfaces';
import { StyledActionBox, StyledIconButton, StyledLikeBox } from './styles';

export const PostCardActions = ({ post, setPost }: PostProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  const [isLikeDisabled, setIsLikeDisabled] = useState(false);

  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();

  const handleLikePost = useCallback(async () => {
    setIsLikeDisabled(true);
    if (post.likes === 0) {
      const response: ServerGetPostResponse = Object(
        await likePost({ path: { post: post.id } }).unwrap(),
      );
      setPost(preparePostToDisplay(response.post));
    } else {
      const response: ServerGetPostResponse = Object(
        await unlikePost({ path: { post: post.id } }).unwrap(),
      );
      setPost(preparePostToDisplay(response.post));
    }
    setIsLikeDisabled(false);
  }, [likePost, post, setPost, unlikePost]);

  return (
    <StyledActionBox>
      <StyledTextButton color="dimmed" fontSize="14px">
        {t('share')}
      </StyledTextButton>
      <StyledLikeBox>
        <StyledIconButton
          disableRipple
          disabled={isLikeDisabled}
          onClick={handleLikePost}
        >
          <FavoriteBorderIcon />
        </StyledIconButton>
        <Typography fontSize="14px">{post.likes}</Typography>
      </StyledLikeBox>
    </StyledActionBox>
  );
};
