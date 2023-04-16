import { Typography } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { User } from 'types/auth';

import { PostCommentActionsButton } from './PostCommentActionsButton';
import { PostCommentActionsMenu } from './PostCommentActionsMenu';
import { StyledAvatar, StyledPostCardHeaderBox } from './styles';

export const PostCardHeader: FC<{ user: User }> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const [deletePost] = useDeleteCommentMutation();

  const handleDeletePost = useCallback(() => {
    console.log('delete post');
  }, []);

  return (
    <StyledPostCardHeaderBox>
      <StyledAvatar src={user.avatar_url} />
      <Typography fontSize="20px">{user.username}</Typography>
      {user.id == user?.id && (
        <>
          <PostCommentActionsButton onClick={handleClick} />
          <PostCommentActionsMenu
            open={openMenu}
            anchorEl={anchorEl}
            onClose={handleClose}
            deleteAction={handleDeletePost}
          />
        </>
      )}
    </StyledPostCardHeaderBox>
  );
};
