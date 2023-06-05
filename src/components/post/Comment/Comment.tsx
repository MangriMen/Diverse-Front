import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ListItemProps, ListItemText } from '@mui/material';
import {
  StyledActionBox as CommentActions,
  CommentButton,
} from 'components/post';
import {
  ActionMenu,
  PostCommentMenuActions,
  PostCommentMenuItem,
} from 'components/post/ActionMenu';
import { CommentLike } from 'components/post/Like';
import { AvatarButton } from 'components/user/AvatarButton';
import { selectUser } from 'ducks/auth/selectors';
import { useDeleteCommentMutation } from 'ducks/comment/api';
import { useCallback, useEffect, useState } from 'react';
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
  ...props
}: {
  post: PostModel;
  comment: CommentModel;
} & ListItemProps) => {
  const user = useSelector(selectUser);

  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  const [deleteComment] = useDeleteCommentMutation();

  const [preparedActions, setPreparedActions] = useState(commentMenuActions);

  const editCallback = useCallback(() => {
    console.log('edit comment:', comment.id, 'in post:', post.id);
  }, [comment.id, post.id]);

  const deleteCallback = useCallback(async () => {
    deleteComment({
      path: { post: post.id, comment: comment.id },
    });
  }, [comment.id, deleteComment, post.id]);

  useEffect(() => {
    setPreparedActions(prevState => ({
      ...prevState,
      edit: { ...prevState.edit, callback: editCallback },
      delete: { ...prevState.delete, callback: deleteCallback },
    }));
  }, [deleteCallback, editCallback]);

  return (
    <ListItemStyled disablePadding alignItems="flex-start" {...props}>
      <ListItemAvatarStyled>
        <AvatarButton user={comment.user} />
      </ListItemAvatarStyled>
      <ListItemText
        primary={
          <CommentHeader>
            <CommentUsername user={comment.user} />
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
