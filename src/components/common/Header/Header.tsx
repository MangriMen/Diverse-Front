import { Container, Menu, MenuItem, Typography } from '@mui/material';
import { Logo } from 'components/common/Logo';
import { CreatePostDialog } from 'components/post/CreatePost/CreatePostDialog';
import { logout } from 'ducks/auth';
import { selectUser } from 'ducks/auth/selectors';
import { useModal } from 'mui-modal-provider';
import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { HeaderAvatar } from './HeaderAvatar';
import { StyledAppBar, StyledToolbar } from './styles';

interface UserMenuItems {
  name: string;
  onClick: () => void;
}

export const Header = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'header' });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { showModal } = useModal({ disableAutoDestroy: true });

  const user = useSelector(selectUser);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenCreateForm = () => showModal(CreatePostDialog);

  const [userSettings] = useState<Array<UserMenuItems>>([
    {
      name: t('profile'),
      onClick: () => {
        navigate(user?.username ?? '');
        handleCloseUserMenu();
      },
    },
    {
      name: t('createPost'),
      onClick: () => {
        handleOpenCreateForm();
        handleCloseUserMenu();
      },
    },
    {
      name: t('logout'),
      onClick: () => {
        handleCloseUserMenu();
        dispatch(logout());
      },
    },
  ]);

  const [menuItems, setMenuItem] = useState<ReactNode>();

  useEffect(() => {
    setMenuItem(
      userSettings.map(settings => (
        <MenuItem key={settings.name} onClick={settings.onClick}>
          <Typography> {settings.name} </Typography>
        </MenuItem>
      )),
    );
  }, [userSettings]);

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="lg">
        <StyledToolbar>
          <Logo />
          <>
            <HeaderAvatar onClick={handleOpenUserMenu} />
            <Menu
              keepMounted
              anchorEl={anchorElUser}
              open={!!anchorElUser}
              onClose={handleCloseUserMenu}
              disableScrollLock
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              {menuItems}
            </Menu>
          </>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};
