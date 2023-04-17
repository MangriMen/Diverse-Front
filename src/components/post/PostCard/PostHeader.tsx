import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@mui/material';
import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from 'types/auth';

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

export const PostCardHeader: FC<{ user: User }> = ({ user }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditPost = useCallback(() => {
    console.log('edit post');
    handleClose();
  }, []);

  const handleDeletePost = useCallback(() => {
    console.log('delete post');
    handleClose();
  }, []);

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
      <StyledAvatar src={user.avatar_url} />
      <Typography fontSize="20px">{user.username}</Typography>
      {user.id == user?.id && (
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
