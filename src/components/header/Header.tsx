import diverseText from 'assets/images/diverseText.svg';
import { Avatar, Box, Container, IconButton, Typography } from '@mui/material';

import { StyledAppBar, StyledLogo } from './styles';

const settings = ['Profile', 'Logout'];

export const Header = () => {
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
          <Typography>{' Username '}</Typography>
          <IconButton>
            <Avatar src="src/assets/images/lucy.jpg" />
          </IconButton>
        </Box>
      </Container>
    </StyledAppBar>
  );
};
