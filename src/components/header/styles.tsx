import { AppBar, Avatar, Box, Toolbar, styled } from '@mui/material';

export const StyledAppBar = styled(AppBar)`
  position: static;
  display: flex;
  flex-direction: row;
  height: 48px;
  box-shadow: none;
  border-bottom: 1px solid;
  border-color: ${props => props.theme.palette.common.third};
  background: ${props => props.theme.palette.primary.light};
`;

export const StyledLogo = styled(Box)`
  max-height: 28px;
` as typeof Box;

export const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
  max-height: 48px;
  ${props => props.theme.breakpoints.up('sm')} {
    min-height: 0;
  }
  ${props => props.theme.breakpoints.up('xs')} {
    min-height: 0;
  }
`;

export const StyledUserBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledAvatar = styled(Avatar)`
  width: 32px;
  height: 32px;
`;
