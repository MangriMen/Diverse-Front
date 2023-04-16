import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';

import { PostCommentActionsProps } from './interfaces';

export const PostCommentActionsMenu = ({
  editAction,
  deleteAction,
  ...props
}: PostCommentActionsProps) => {
  return (
    <Menu
      transformOrigin={{ vertical: 'top', horizontal: 5 }}
      MenuListProps={{
        sx: {
          padding: 0,

          '& .MuiListItemIcon-root': {
            minWidth: '0px',
            width: '36px',
            display: 'flex',
            justifyContent: 'center',
          },
        },
      }}
      {...props}
    >
      <MenuItem disableGutters onClick={editAction}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
      </MenuItem>
      <MenuItem disableGutters onClick={deleteAction}>
        <ListItemIcon>
          <DeleteIcon color="error" fontSize="small" />
        </ListItemIcon>
      </MenuItem>
    </Menu>
  );
};
