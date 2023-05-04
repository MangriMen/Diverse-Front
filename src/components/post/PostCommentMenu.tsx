import { useState } from 'react';
import { PostCommentMenuButton } from './PostCommentMenuButton';
import { VerticalMenu } from './VerticalMenu';
import { ButtonProps, MenuProps } from '@mui/material';

export const PostCommentMenu = ({
  title,
  children,
}: {
  title: ButtonProps['title'];
  children: MenuProps['children'];
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <PostCommentMenuButton title={title} onClick={handleClick} />
      <VerticalMenu
        open={openMenu}
        anchorEl={anchorEl}
        onClick={handleClose}
        onClose={handleClose}
      >
        {children}
      </VerticalMenu>
    </>
  );
};
