import { MenuProps } from '@mui/material';
import { CommonProps } from '@mui/material/OverridableComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { VerticalMenu } from '../../../common/VerticalMenu';
import { PostCommentMenuButton } from './ActionMenuButton';

export interface ActionMenuProps extends CommonProps {
  visible: boolean;
  children: MenuProps['children'];
}

export const ActionMenu = ({
  visible,
  children,
  ...props
}: ActionMenuProps) => {
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
        {...props}
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
