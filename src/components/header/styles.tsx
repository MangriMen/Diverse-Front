import { AppBar, Box, styled } from '@mui/material';

export const StyledAppBar = styled(AppBar)({
  position: 'static',
  display: 'flex',
  flexDirection: 'row',
  maxHeight: '48px',
  boxShadow: 'none',
  borderBottom: '1px solid',
  borderColor: '#353a3d',
});

export const StyledLogo = styled(Box)({
  maxHeight: '28px',
}) as typeof Box;
