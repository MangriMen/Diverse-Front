import { Tooltip, Typography } from '@mui/material';

import { UserTooltipProps } from './interfaces';

export const UserTooltip = ({ user, children }: UserTooltipProps) => {
  return (
    <Tooltip title={<Typography>{user?.username}</Typography>}>
      {children}
    </Tooltip>
  );
};
