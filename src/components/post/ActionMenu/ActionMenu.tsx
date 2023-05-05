import { MenuProps } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { VerticalMenu } from '../../common/VerticalMenu';
import { PostCommentMenuButton } from './ActionMenuButton';

export const ActionMenu = ({
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
