import diverseText from 'assets/images/diverseText.svg';
import {
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, selectUser } from 'ducks/auth/selectors';
import { logout } from 'ducks/auth';

import {
  StyledAppBar,
  StyledAvatar,
  StyledLogo,
  StyledToolbar,
  StyledUserBox,
  StyledUsername,
} from './styles';

interface UserMenuItems {
  name: string;
  onClick: () => void;
}

export const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const user = useSelector(selectUser);
  const isAuth = useSelector(selectIsAuth);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useDispatch();

  const [userSettings] = useState<Array<UserMenuItems>>([
    {
      name: 'Profile',
      onClick: () => {
        handleCloseUserMenu();
      },
    },
    {
      name: 'Logout',
      onClick: () => {
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
    <StyledAppBar position="static">
      <Container maxWidth="lg">
        <StyledToolbar>
          <StyledLogo component="img" src={diverseText} alt="Diverse" />
          <StyledUserBox>
            {isAuth ? (
              <>
                <StyledUsername>{user?.username}</StyledUsername>
                <IconButton onClick={handleOpenUserMenu} disableRipple>
                  <StyledAvatar src="src/assets/images/lucy.jpg" />
                </IconButton>
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
              </>
            ) : (
              <>
                <IconButton onClick={handleOpenUserMenu} disableRipple>
                  <StyledAvatar />
                </IconButton>
              </>
            )}
          </StyledUserBox>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};
