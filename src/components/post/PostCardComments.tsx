import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';

export const PostCardComments = () => {
  return (
    <List sx={{ overflow: 'auto' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box
              sx={{ display: 'flex', gap: '0 1.5rem', alignItems: 'flex-end' }}
            >
              <Typography>{'Username'}</Typography>
              <Typography variant="caption" color="common.dimmed">
                {'2 Дня назад'}
              </Typography>
            </Box>
          }
          secondary={
            <Typography variant="body2">
              {
                'Lorem ipsum dolor sit amet, consectetur popa daw adipiscing elit. Donec \r'
              }
            </Typography>
          }
        />
      </ListItem>
    </List>
  );
};
