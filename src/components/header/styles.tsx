import { AppBar, Box, styled } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'static',
  display: 'flex',
  flexDirection: 'row',
  height: '48px',
  boxShadow: 'none',
  borderBottom: '1px solid',
  borderColor: theme.palette.common.third,
  background: theme.palette.primary.light,
}));

export const StyledLogo = styled(Box)({
  maxHeight: '28px',
}) as typeof Box;
