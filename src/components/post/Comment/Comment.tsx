import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, ListItemText } from '@mui/material';
import { StyledTextButton } from 'components/common/styles';
import { selectUser } from 'ducks/auth/selectors';
import { useDeleteCommentMutation } from 'ducks/comment/api';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CommentModel, PostModel } from 'types/post';

import { CommentLike } from '../PostCommentLike';
import { PostCommentMenuItem } from '../PostCommentMenuItem';
import {
  ListItemAvatarStyled,
  StyledActionBox,
  StyledComment,
  StyledCommentHeaderBox,
} from '../styles';
import { CommentDate } from './CommentDate';
import { CommentUsername, CommentTextStyled, ListItemStyled } from './styles';
import { PostCommentMenuActions } from '../interfaces';
import { PostCommentMenu } from '../PostCommentMenu';

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

export const Comment = ({
  post,
  comment,
}: {
  post: PostModel;
  comment: CommentModel;
}) => {
  const user = useSelector(selectUser);

  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  const [deleteComment] = useDeleteCommentMutation();

  const [preparedActions] = useState(commentMenuActions);

  preparedActions.edit.callback = useCallback(() => {
    console.log('edit comment');
  }, []);

  preparedActions.delete.callback = useCallback(async () => {
    deleteComment({
      path: { post: post.id, comment: comment.id },
    });
  }, [comment.id, deleteComment, post.id]);

  const [commentMenuItems, setCommentMenuItems] = useState<ReactElement[]>();

  useEffect(() => {
    setCommentMenuItems(
      Object.values(preparedActions).map(action => (
        <PostCommentMenuItem key={action.key} action={action} />
      )),
    );
  }, [preparedActions]);

  return (
    <ListItemStyled disablePadding alignItems="flex-start">
      <ListItemAvatarStyled>
        <Avatar src={`${comment.user.avatar_url}?width=80`} />
      </ListItemAvatarStyled>
      <ListItemText
        primary={
          <StyledCommentHeaderBox>
            <CommentUsername
              title={comment.user.username}
              component="span"
              padding="0 4px"
            >
              {comment.user.username}
            </CommentUsername>
            <CommentDate created_at={comment.created_at} />
            <Box width="24px">
              {comment.user.id == user?.id && (
                <PostCommentMenu title={t('actions') ?? ''}>
                  {commentMenuItems}
                </PostCommentMenu>
              )}
            </Box>
          </StyledCommentHeaderBox>
        }
        secondary={
          <CommentTextStyled component="span">
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
              <CommentLike post={post} comment={comment} />
            </StyledActionBox>
          </CommentTextStyled>
        }
      />
    </ListItemStyled>
  );
};
