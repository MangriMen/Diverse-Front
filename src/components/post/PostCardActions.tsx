import FavoriteIcon from '@mui/icons-material/Favorite';
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

  const [getPostValues] = useState({ path: { post: post.id } });

  const [isLikeDisabled, setIsLikeDisabled] = useState(false);

  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();

  const handleLikePost = useCallback(async () => {
    setIsLikeDisabled(true);

    const response: ServerGetPostResponse = Object(
      await (() => (post.liked_by_me ? unlikePost : likePost))()(
        getPostValues,
      ).unwrap(),
    );

    setPost(prevState => ({
      ...prevState,
      ...preparePostToDisplay(response.post),
    }));

    setIsLikeDisabled(false);
  }, [getPostValues, likePost, post.liked_by_me, setPost, unlikePost]);

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
          {post.liked_by_me && <FavoriteIcon />}
          {!post.liked_by_me && <FavoriteBorderIcon />}
        </StyledIconButton>
        <Typography fontSize="14px">{post.likes}</Typography>
      </StyledLikeBox>
    </StyledActionBox>
  );
};
