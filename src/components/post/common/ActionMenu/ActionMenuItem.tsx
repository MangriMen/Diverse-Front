import { ListItemIcon, MenuItem, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { PostCommentMenuItemProps } from './interfaces';

export const PostCommentMenuItem = ({ action }: PostCommentMenuItemProps) => {
  const { t } = useTranslation('translation');

  return (
    <MenuItem key={action.key} disableGutters onClick={action.callback}>
      <Tooltip
        placement="left"
        title={<Typography variant="caption">{t(action.key)}</Typography>}
      >
        <ListItemIcon>
          <action.icon color={action.color} fontSize="small" />
        </ListItemIcon>
      </Tooltip>
    </MenuItem>
  );
};
