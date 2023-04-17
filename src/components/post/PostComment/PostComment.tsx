import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Avatar, ListItem, ListItemText, Typography } from '@mui/material';
import { StyledTextButton } from 'components/common/styles';
import { selectUser } from 'ducks/auth/selectors';
import { useDeleteCommentMutation } from 'ducks/comment/api';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CommentModel, PostModel } from 'types/post';

import { PostCommentMenuButton } from '../PostCommentMenuButton';
import { PostCommentMenuItem } from '../PostCommentMenuItem';
import { VerticalMenu } from '../VerticalMenu';
import { PostCommentMenuActions } from '../interfaces';
import {
  ListItemAvatarStyled,
  StyledActionBox,
  StyledComment,
  StyledCommentHeaderBox,
  StyledIconButton,
  StyledLikeBox,
} from '../styles';
import { CommentDate } from './CommentDate';

const commentMenuActions: PostCommentMenuActions = {
  edit: {
    key: 'comment.edit',
    icon: EditIcon,
  },
  delete: {
    key: 'comment.delete',
    color: 'error',
    icon: DeleteIcon,
  },
};

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

  const handleEditComment = useCallback(() => {
    console.log('edit comment');
    handleClose();
  }, []);

  const handleDeleteComment = useCallback(async () => {
    await deleteComment({
      path: { post: post.id, comment: comment.id },
    });
    handleClose();
  }, [comment.id, deleteComment, post.id]);

  const [commentMenuItems, setCommentMenuItems] = useState<ReactElement[]>();

  useEffect(() => {
    const preparedActions = {
      edit: {
        ...commentMenuActions.edit,
        callback: handleEditComment,
      },
      delete: {
        ...commentMenuActions.delete,
        callback: handleDeleteComment,
      },
    };

    setCommentMenuItems(
      Object.values(preparedActions).map(action => (
        <PostCommentMenuItem key={action.key} action={action} />
      )),
    );
  }, [handleDeleteComment, handleEditComment]);

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
                <PostCommentMenuButton
                  title={t('actions') ?? ''}
                  onClick={handleClick}
                />
                <VerticalMenu
                  open={openMenu}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                >
                  {commentMenuItems}
                </VerticalMenu>
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
                <StyledIconButton disableRipple title={t('like') ?? ''}>
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
