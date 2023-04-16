import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Avatar, ListItem, ListItemText, Typography } from '@mui/material';
import { StyledTextButton } from 'components/common/styles';
import { selectUser } from 'ducks/auth/selectors';
import { useDeleteCommentMutation } from 'ducks/comment/api';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CommentModel, PostModel } from 'types/post';

import { CommentDate } from './CommentDate';
import { PostCommentActionsButton } from './PostCommentActionsButton';
import { PostCommentActionsMenu } from './PostCommentActionsMenu';
import {
  ListItemAvatarStyled,
  StyledActionBox,
  StyledComment,
  StyledCommentHeaderBox,
  StyledIconButton,
  StyledLikeBox,
} from './styles';

export const PostCardComment = ({
  post,
  comment,
}: {
  post: PostModel;
  comment: CommentModel;
}) => {
  const user = useSelector(selectUser);

  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = useCallback(async () => {
    await deleteComment({
      path: { post: post.id, comment: comment.id },
    });
    handleClose();
  }, [comment.id, deleteComment, post.id]);

  return (
    <ListItem alignItems="flex-start" disablePadding>
      <ListItemAvatarStyled>
        <Avatar src={comment.user.avatar_url} />
      </ListItemAvatarStyled>
      <ListItemText
        primary={
          <StyledCommentHeaderBox>
            <Typography
              component="span"
              fontSize="14px"
              padding="0 4px"
              alignSelf="center"
            >
              {comment.user.username}
            </Typography>
            <CommentDate created_at={comment.created_at} />
            {comment.user.id == user?.id && (
              <>
                <PostCommentActionsButton onClick={handleClick} />
                <PostCommentActionsMenu
                  open={openMenu}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  deleteAction={handleDeleteComment}
                />
              </>
            )}
          </StyledCommentHeaderBox>
        }
        secondary={
          <>
            <StyledComment
              component="span"
              fontSize="12px"
              variant="body2"
              padding="0 4px"
            >
              {comment.content}
            </StyledComment>
            <StyledActionBox component="span">
              <StyledTextButton color="dimmed" fontSize="12px">
                {t('reply')}
              </StyledTextButton>
              <StyledLikeBox component="span">
                <StyledIconButton disableRipple>
                  <FavoriteBorderIcon fontSize="small" />
                </StyledIconButton>
                <Typography component="span" fontSize="12px">
                  {comment.likes}
                </Typography>
              </StyledLikeBox>
            </StyledActionBox>
          </>
        }
      />
    </ListItem>
  );
};
