import { Avatar, Box, Typography, styled } from '@mui/material';

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
