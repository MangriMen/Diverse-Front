import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
  styled,
} from '@mui/material';

export const StyledAppBar = styled(AppBar)`
  display: flex;
  flex-direction: row;
  height: 48px;
  box-shadow: none;
  border-bottom: 1px solid;
  border-color: ${props => props.theme.palette.common.third};
  background: ${props => props.theme.palette.primary.light};
`;

export const StyledToolbar = styled(Toolbar)`
  height: 100%;
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

export const StyledUsername = styled(Typography)`
  ${props => props.theme.breakpoints.down('sm')} {
    display: none;
  }
`;

export const StyledHeaderAvatarButton = styled(Button)`
  box-shadow: none;
  background-color: transparent;
  padding: 0.25rem 0.75rem;

  &:hover {
    background-color: ${props => props.theme.palette.common.hover};
    box-shadow: none;
  }
`;
