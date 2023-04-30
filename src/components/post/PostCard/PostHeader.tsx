import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@mui/material';
import { API_BASE_URL } from 'consts/endpoints';
import { useDeletePostMutation } from 'ducks/post/api';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PostModel } from 'types/post';

import { PostCommentMenuButton } from '../PostCommentMenuButton';
import { PostCommentMenuItem } from '../PostCommentMenuItem';
import { VerticalMenu } from '../VerticalMenu';
import { PostCommentMenuActions } from '../interfaces';
import { StyledAvatar, StyledPostCardHeaderBox } from '../styles';

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
  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [deletePost] = useDeletePostMutation();

  const handleEditPost = useCallback(() => {
    console.log('edit post');
    handleClose();
  }, []);

  const handleDeletePost = useCallback(async () => {
    await deletePost({
      path: { post: post.id },
    });
    handleClose();
  }, [deletePost, post.id]);

  const [postMenuItems, setPostMenuItems] = useState<ReactElement[]>();

  useEffect(() => {
    const preparedActions = {
      edit: {
        ...postMenuActions.edit,
        callback: handleEditPost,
      },
      delete: {
        ...postMenuActions.delete,
        callback: handleDeletePost,
      },
    };

    setPostMenuItems(
      Object.values(preparedActions).map(action => (
        <PostCommentMenuItem key={action.key} action={action} />
      )),
    );
  }, [handleDeletePost, handleEditPost]);

  return (
    <StyledPostCardHeaderBox>
      <StyledAvatar src={`${API_BASE_URL}${post.user?.avatar_url}?width=96`} />
      <Typography fontSize="20px">{post.user.username}</Typography>
      {post.user.id == post.user?.id && (
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
            {postMenuItems}
          </VerticalMenu>
        </>
      )}
    </StyledPostCardHeaderBox>
  );
};
