import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  ActionMenu,
  PostCommentMenuActions,
  PostCommentMenuItem,
} from 'components/post/common/ActionMenu';
import { AvatarButton } from 'components/user/AvatarButton';
import { UsernameLinkButton } from 'components/user/UsernameLinkButton';
import { selectUser } from 'ducks/auth/selectors';
import { useDeletePostMutation } from 'ducks/post/api';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PostModel } from 'types/post';

import { SmartDate } from '../Comment';
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
      <AvatarButton
        user={post.user}
        style={{ gridRow: '1/3', gridColumn: 1 }}
      />
      <UsernameLinkButton
        user={post.user}
        style={{ gridRow: 1, gridColumn: 2 }}
      />
      <SmartDate
        timestamp={post.created_at}
        style={{ gridRow: 2, gridColumn: 2, paddingLeft: '4px' }}
      />
      <ActionMenu
        visible={post.user.id == user?.id}
        style={{ gridRow: '1', gridColumn: 3 }}
      >
        {Object.values(preparedActions).map(action => (
          <PostCommentMenuItem key={action.key} action={action} />
        ))}
      </ActionMenu>
    </PostHeader>
  );
};
