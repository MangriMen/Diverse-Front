import { Avatar, Box, styled } from '@mui/material';

export const StyledProfileAvatar = styled(Avatar)`
  width: 192px;
  height: 192px;
`;

export const StyledUserInfo = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const StyledUserPosts = styled(Box)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
