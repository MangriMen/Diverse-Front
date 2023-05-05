import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, ListItemText } from '@mui/material';
import {
  StyledActionBox as CommentActions,
  CommentButton,
} from 'components/post';
import { CommentLike } from 'components/post/Like';
import {
  ActionMenu,
  PostCommentMenuActions,
  PostCommentMenuItem,
} from 'components/post/ActionMenu';
import { selectUser } from 'ducks/auth/selectors';
import { useDeleteCommentMutation } from 'ducks/comment/api';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CommentModel, PostModel } from 'types/post';
import { CommentDate } from './CommentDate';
import {
  CommentBody,
  CommentHeader,
  CommentText,
  CommentUsername,
  ListItemAvatarStyled,
  ListItemStyled,
} from './styles';

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

  return (
    <ListItemStyled disablePadding alignItems="flex-start">
      <ListItemAvatarStyled>
        <Avatar src={`${comment.user.avatar_url}?width=80`} />
      </ListItemAvatarStyled>
      <ListItemText
        primary={
          <CommentHeader>
            <CommentUsername component="span" title={comment.user.username}>
              {comment.user.username}
            </CommentUsername>
            <CommentDate timestamp={comment.created_at} />
            <ActionMenu visible={comment.user.id == user?.id}>
              {Object.values(preparedActions).map(action => (
                <PostCommentMenuItem key={action.key} action={action} />
              ))}
            </ActionMenu>
          </CommentHeader>
        }
        secondary={
          <CommentBody>
            <CommentText component="span">{comment.content}</CommentText>
            <CommentActions>
              <CommentButton>{t('reply')}</CommentButton>
              <CommentLike post={post} comment={comment} />
            </CommentActions>
          </CommentBody>
        }
      />
    </ListItemStyled>
  );
};
