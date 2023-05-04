import { useState } from 'react';
import { PostCommentMenuButton } from './PostCommentMenuButton';
import { VerticalMenu } from './VerticalMenu';
import { MenuProps } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const PostCommentMenu = ({
  visible,
  children,
}: {
  visible: boolean;
  children: MenuProps['children'];
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });

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
      <PostCommentMenuButton
        title={t('actions') ?? ''}
        visibility={visible ? 'visible' : 'hidden'}
        onClick={handleClick}
      />
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
