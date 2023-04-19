import { Avatar, Box, styled } from '@mui/material';

export const StyledProfileAvatar = styled(Avatar)`
  width: 192px;
  height: 192px;
`;

export const StyledUserInfo = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const StyledUserPosts = styled(Box)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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
