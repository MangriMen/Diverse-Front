import { Avatar, Box, Typography, styled } from '@mui/material';
import { StyledInput } from 'components/auth/styles';
import { StyledButton } from 'components/common';
import { BaseLayout } from 'components/pages/styles';
import { StyledIconButton } from 'components/post/styles';

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
    width: 64px;
    height: 64px;
  }
`;

export const UserInfo = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MainUserInfo = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: space-evenly;
  align-items: center;

  ${props => props.theme.breakpoints.down('sm')} {
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
  }
`;

export const UserDescription = styled(Box)`
  width: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const AvatarWithName = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  grid-column: 2;

  ${props => props.theme.breakpoints.down('sm')} {
    grid-column: 1;
    grid-row: 1/3;
  }
`;

export const Username = styled(Typography)`
  font-size: 1.5rem;

  ${props => props.theme.breakpoints.down('sm')} {
    font-size: 1rem;
  }
`;

export const Name = styled(Typography)`
  text-align: center;
  font-size: 1rem;

  ${props => props.theme.breakpoints.down('sm')} {
    display: none;
  }
`;

export const NameInDescription = styled(Typography)`
  font-size: 0.875rem;

  text-align: center;
  display: none;

  ${props => props.theme.breakpoints.down('sm')} {
    display: unset;
  }
`;

export const UsernameAndName = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ProfileAvatarWithAction = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  :hover * {
    visibility: visible;
    opacity: 1;
  }
`;

export const ProfileAvatarButtonBox = styled(Box)`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const ProfileAvatarActionButton = styled(StyledIconButton)`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const ProfileAvatarSettingsButton = styled(ProfileAvatarActionButton)`
  visibility: hidden;
  opacity: 0;

  transition: visibility 0.3s ease-out, opacity 0.3s ease-out;
`;

export const FollowerRelation = styled(Box)`
  grid-column: 1;

  ${props => props.theme.breakpoints.down('sm')} {
    grid-column: 2;
    grid-row: 1;
  }
`;

export const FollowingRelation = styled(Box)`
  grid-column: 3;

  ${props => props.theme.breakpoints.down('sm')} {
    grid-column: 2;
    grid-row: 2;
  }
`;

export const BoxSettings = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-rows: auto 14rem auto;
  gap: 2rem;
`;

export const InformationViewBox = styled(Box)`
  display: grid;
  grid-template-columns: 12.5rem minmax(0, 20rem) auto;
  grid-template-rows: repeat(2, auto);
  gap: 1rem;
  grid-template-columns: subgrid;
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

export const UsernameInputStyled = styled(StyledInput)`
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

export const CurrentPasswordInput = styled(StyledInput)`
  grid-row: 1;
`;

export const NewPasswordInput = styled(StyledInput)`
  grid-row: 2;
`;

export const NewPasswordConfirmInput = styled(StyledInput)`
  grid-row: 3;
`;

export const SaveSettingsButton = styled(StyledButton)`
  max-width: 20rem;
  ${props => props.theme.breakpoints.down('md')} {
    max-width: 100%;
  }
`;
