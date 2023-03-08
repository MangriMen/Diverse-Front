import diverseText from 'assets/images/diverseText.svg';
import {
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectUser } from 'ducks/auth/selectors';

import {
  StyledAppBar,
  StyledAvatar,
  StyledLogo,
  StyledToolbar,
  StyledUserBox,
  StyledUsername,
} from './styles';

const settings = ['Profile', 'Logout'];

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
                  {settings.map(settings => (
                    <MenuItem key={settings}>
                      <Typography>{settings}</Typography>
                    </MenuItem>
                  ))}
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
