import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  ActionMenu,
  PostCommentMenuActions,
  PostCommentMenuItem,
} from 'components/post/ActionMenu';
import { AvatarButton } from 'components/user/AvatarButton';
import { UsernameLinkButton } from 'components/user/UsernameLinkButton';
import { selectUser } from 'ducks/auth/selectors';
import { useDeletePostMutation } from 'ducks/post/api';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PostModel } from 'types/post';

import { PostHeader } from './styles';

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

  const navigate = useNavigate();

  const [deletePost] = useDeletePostMutation();

  const [preparedActions] = useState(postMenuActions);

  preparedActions.edit.callback = useCallback(() => {
    console.log('edit post');
  }, []);

  preparedActions.delete.callback = useCallback(async () => {
    await deletePost({
      path: { post: post.id },
    });
    navigate(0);
  }, [deletePost, navigate, post.id]);

  return (
    <PostHeader>
      <AvatarButton user={post.user} />
      <UsernameLinkButton user={post.user} />
      <ActionMenu visible={post.user.id == user?.id}>
        {Object.values(preparedActions).map(action => (
          <PostCommentMenuItem key={action.key} action={action} />
        ))}
      </ActionMenu>
    </PostHeader>
  );
};
