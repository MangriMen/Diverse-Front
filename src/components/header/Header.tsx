import diverseText from 'assets/images/diverseText.svg';
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { StyledAppBar, StyledLogo } from './styles';

const settings = ['Profile', 'Logout'];

export const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <StyledAppBar>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <StyledLogo component="img" src={diverseText} alt="Diverse" />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Typography>{'username'}</Typography>
          <Tooltip title="Open">
            <IconButton onClick={handleOpenUserMenu} disableRipple>
              <Avatar src="src/assets/images/lucy.jpg" />
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
        </Box>
      </Container>
    </StyledAppBar>
  );
};
