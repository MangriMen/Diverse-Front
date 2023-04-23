import { Avatar } from '@mui/material';
import { StyledIconButton } from 'components/post/styles';
import { ROUTE } from 'consts';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'types/auth';

export const AvatarButton = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();

  return (
    <StyledIconButton
      onClick={() => {
        navigate(`${ROUTE.HOME}${user?.username}`);
      }}
    >
      <Avatar src={`${user?.avatar_url}?width=96`} />
    </StyledIconButton>
  );
};
