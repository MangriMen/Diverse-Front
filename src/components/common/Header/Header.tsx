import { Box, Container, Menu, MenuItem, Typography } from '@mui/material';
import { Logo } from 'components/common/Logo';
import { CreatePostForm } from 'components/post/CreatePost/CreatePostForm';
import { StyledModal } from 'components/post/styles';
import { logout } from 'ducks/auth';
import { selectUser } from 'ducks/auth/selectors';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  const user = useSelector(selectUser);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleOpenCreateForm = () => {
    setOpen(true);
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
        navigate(user?.username ?? '');
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

  const handleCloseCreateForm = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <StyledAppBar position="sticky">
      <StyledModal open={open} onClose={handleCloseCreateForm}>
        <Box>
          <CreatePostForm onClose={handleCloseCreateForm} />
        </Box>
      </StyledModal>
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