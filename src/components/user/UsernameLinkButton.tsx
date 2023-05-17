import { Typography } from '@mui/material';
import { StyledTextButton } from 'components/common';
import { ROUTE } from 'consts';
import React from 'react';

import { UserTooltip } from './UserTooltip';
import { UsernameLinkButtonProps } from './interfaces';

export const UsernameLinkButton = ({
  user,
  typographyProps,
  ...props
}: UsernameLinkButtonProps) => {
  const userPageHref = `${ROUTE.HOME}${user?.username}`;

  return (
    <UserTooltip user={user}>
      <StyledTextButton href={userPageHref} {...props}>
        <Typography {...typographyProps}>{user?.username}</Typography>
      </StyledTextButton>
    </UserTooltip>
  );
};
