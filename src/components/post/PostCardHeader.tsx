import { Typography } from '@mui/material';
import { FC } from 'react';
import { User } from 'types/auth';

import { StyledAvatar, StyledPostCardHeaderBox } from './styles';

export const PostCardHeader: FC<{ user: User }> = ({ user }) => {
  return (
    <StyledPostCardHeaderBox>
      <StyledAvatar src={user.avatar_url} />
      <Typography fontSize="20px">{user.username}</Typography>
    </StyledPostCardHeaderBox>
  );
};
