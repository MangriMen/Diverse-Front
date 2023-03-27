import { Container, Menu, MenuItem, Typography } from '@mui/material';
import { Logo } from 'components/common/Logo';
import { CreatePostForm } from 'components/post/CreatePost/CreatePostForm';
import { ROUTE } from 'consts';
import { logout } from 'ducks/auth';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { HeaderAvatar } from './HeaderAvatar';
import { StyledAppBar, StyledToolbar, StyledUserBox } from './styles';

interface UserMenuItems {
  name: string;
  onClick: () => void;
}

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleOpenCreateForm = () => {
    setOpen(true);
  };

  const handleCloseCreateForm = () => {
    setOpen(false);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [userSettings] = useState<Array<UserMenuItems>>([
    {
      name: 'Profile',
      onClick: () => {
        navigate(ROUTE.ME);
        handleCloseUserMenu();
      },
    },
    {
      name: 'Create Post',
      onClick: () => {
        handleOpenCreateForm();
        handleCloseUserMenu();
      },
    },
    {
      name: 'Logout',
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
      <CreatePostForm isOpen={open} onClose={handleCloseCreateForm} />
      <Container maxWidth="lg">
        <StyledToolbar>
          <Logo />
          <StyledUserBox>
            <HeaderAvatar onClick={handleOpenUserMenu} />
            <Menu
              keepMounted
              anchorEl={anchorElUser}
              open={!!anchorElUser}
              onClose={handleCloseUserMenu}
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
          </StyledUserBox>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};
