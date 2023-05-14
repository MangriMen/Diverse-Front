import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { StyledAvatar } from 'components/post';
import {
  ActionMenu,
  PostCommentMenuActions,
  PostCommentMenuItem,
} from 'components/post/ActionMenu';
import { API_BASE_URL } from 'consts/endpoints';
import { selectUser } from 'ducks/auth/selectors';
import { useDeletePostMutation } from 'ducks/post/api';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PostModel } from 'types/post';

import { PostHeader, PostUsername } from './styles';

const postMenuActions: PostCommentMenuActions = {
  edit: {
    key: 'post.edit',
    icon: EditIcon,
  },
  delete: {
    key: 'post.delete',
    color: 'error',
    icon: DeleteIcon,
  },
};

export const PostCardHeader = ({ post }: { post: PostModel }) => {
  const user = useSelector(selectUser);

  const [deletePost] = useDeletePostMutation();

  const [preparedActions, setPreparedActions] = useState(postMenuActions);

  const editCallback = useCallback(() => {
    console.log('edit post:', post.id);
  }, [post.id]);

  const deleteCallback = useCallback(async () => {
    deletePost({
      path: { post: post.id },
    });
  }, [deletePost, post.id]);

  useEffect(() => {
    setPreparedActions(prevState => ({
      ...prevState,
      edit: { ...prevState.edit, callback: editCallback },
      delete: { ...prevState.delete, callback: deleteCallback },
    }));
  }, [deleteCallback, editCallback]);

  return (
    <PostHeader>
      <StyledAvatar src={`${API_BASE_URL}${post.user?.avatar_url}?width=96`} />
      <PostUsername>{post.user.username}</PostUsername>
      <ActionMenu visible={post.user.id == user?.id}>
        {Object.values(preparedActions).map(action => (
          <PostCommentMenuItem key={action.key} action={action} />
        ))}
      </ActionMenu>
    </PostHeader>
  );
};
