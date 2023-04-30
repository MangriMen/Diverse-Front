import { Avatar, Box, Typography, styled } from '@mui/material';
import { StyledIconButton } from 'components/post/styles';

export const StyledProfileAvatar = styled(Avatar)`
  width: 192px;
  height: 192px;
`;

export const UserInfo = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MainUserInfo = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const UserDescription = styled(Box)`
  width: 100;
  display: flex;
  justify-content: center;
`;

export const UserDescriptionText = styled(Typography)`
  width: 65%;
  text-align: center;
  font-size: 14px;
`;

export const StyledUserPosts = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 378px);
  gap: 0.5rem;
`;

export const RelationBlock = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
