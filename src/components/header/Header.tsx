import diverseText from 'assets/images/diverseText.svg';
import {
  Avatar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
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
    <StyledAppBar>
      <Container>
        <StyledToolbar>
          <StyledLogo component="img" src={diverseText} alt="Diverse" />
          <StyledUserBox>
            {isAuth ? (
              <>
                <Typography>{user?.username}</Typography>
                <Tooltip title="Open">
                  <IconButton onClick={handleOpenUserMenu} disableRipple>
                    <StyledAvatar src="src/assets/images/lucy.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorElUser}
                  open={!!anchorElUser}
                  onClose={handleCloseUserMenu}
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
                <Typography>{''}</Typography>
                <Tooltip title="Open">
                  <IconButton onClick={handleOpenUserMenu} disableRipple>
                    <Avatar />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </StyledUserBox>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};
