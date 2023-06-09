import { Avatar, Box, Typography, styled } from '@mui/material';
import { StyledInput } from 'components/auth/styles';
import { StyledButton } from 'components/common';
import { PasswordInput } from 'components/common/PasswordInput';
import { UsernameInput } from 'components/common/UsernameInput';
import { BaseLayout } from 'components/pages/styles';

export const UserPageLayout = styled(BaseLayout)`
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
`;

export const StyledProfileAvatar = styled(Avatar)`
  width: 192px;
  height: 192px;

  ${props => props.theme.breakpoints.down('sm')} {
    width: 96px;
    height: 96px;
  }

  ${props => props.theme.breakpoints.down('mobile')} {
    width: 80px;
    height: 80px;
  }
`;

export const UserInfo = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const MainUserInfo = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  justify-items: center;
  align-items: center;
  column-gap: 1rem;

  ${props => props.theme.breakpoints.down('mobile')} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }
`;

export const UserDescription = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  word-break: break-all;
`;

export const UserDescriptionText = styled(Typography)`
  width: 65%;
  text-align: center;
  text-align-last: center;
  font-size: 14px;

  color: ${props => props.theme.palette.common.dimmed};

  ${props => props.theme.breakpoints.down('sm')} {
    width: 100%;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const StyledUserPosts = styled(Box)`
  width: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(
    auto-fill,
    clamp(17.5rem, 15.533rem + 11.239vw, 23.625rem)
  );
  gap: 0.5rem;
`;

export const RelationBlock = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;
`;

export const UsersHorizontalList = styled(Box)`
  display: flex;
  gap: 1rem;
`;

export const Username = styled(Typography)`
  font-size: 1.5rem;
`;

export const Name = styled(Typography)`
  font-size: 1rem;
`;

export const ProfileAvatarWithAction = styled(Box)`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;

  position: relative;
  grid-column: 2;

  :hover * {
    opacity: 1;
  }

  ${props => props.theme.breakpoints.down('mobile')} {
    grid-column: 1;
    grid-row: 1/3;
  }
`;

export const ProfileAvatarButtonBox = styled(Box)`
  position: absolute;
  bottom: 0;
  right: 0;

  ${props => props.theme.breakpoints.down('sm')} {
    position: unset;
  }
`;

export const FollowerRelation = styled(Box)`
  grid-column: 1;

  ${props => props.theme.breakpoints.down('mobile')} {
    grid-column: 2;
    grid-row: 1;
  }
`;

export const FollowingRelation = styled(Box)`
  grid-column: 3;

  ${props => props.theme.breakpoints.down('mobile')} {
    grid-column: 2;
    grid-row: 2;
  }
`;

export const BoxSettings = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-rows: auto 14rem auto;
  gap: 2rem;
  ${props => props.theme.breakpoints.down('md')} {
    grid-template-rows: repeat(5, auto);
  }
`;

export const InformationViewBox = styled(Box)`
  display: grid;
  grid-template-columns: 12.5rem minmax(0, 20rem) auto;
  grid-template-rows: repeat(2, auto);
  gap: 1rem;
  ${props => props.theme.breakpoints.down('md')} {
    grid-template-columns: repeat(1, auto);
    grid-template-rows: repeat(4, auto);
  }
`;

export const NameInputStyled = styled(StyledInput)`
  grid-column: 2;
  grid-row: 1;
  ${props => props.theme.breakpoints.down('md')} {
    grid-column: 1;
    grid-row: 2;
  }
`;

export const UsernameInputStyled = styled(UsernameInput)`
  grid-column: 2;
  grid-row: 2;
  align-self: flex-end;
  ${props => props.theme.breakpoints.down('md')} {
    grid-column: 1;
    grid-row: 3;
  }
  & .MuiTextField-root.MuiHelperText {
    margin-right: 0;
  }
`;

export const AboutInputStyled = styled(StyledInput)`
  grid-column: 3;
  grid-row: 1 / 3;
  flex: 1;
  ${props => props.theme.breakpoints.down('md')} {
    grid-column: 1;
    grid-row: 4;
  }
`;

export const PasswordViewBox = styled(Box)`
  display: grid;
  gap: 1rem;
  grid-template-columns: 20rem;
  grid-template-rows: repeat(3, auto);
  ${props => props.theme.breakpoints.down('md')} {
    grid-template-columns: auto;
  }
`;

export const CurrentPasswordInput = styled(PasswordInput)`
  grid-row: 1;
`;

export const NewPasswordInput = styled(PasswordInput)`
  grid-row: 2;
`;

export const NewPasswordConfirmInput = styled(PasswordInput)`
  grid-row: 3;
`;

export const SaveSettingsButton = styled(StyledButton)`
  max-width: 20rem;
  ${props => props.theme.breakpoints.down('md')} {
    max-width: 100%;
  }
`;
