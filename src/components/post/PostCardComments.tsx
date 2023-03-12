import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

import { StyledCommentHeaderBox, StyledList } from './styles';

export const PostCardComments = () => {
  return (
    <StyledList>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <ListItemText
          primary={
            <StyledCommentHeaderBox>
              <Typography>{'Username'}</Typography>
              <Typography variant="caption" color="common.dimmed">
                {'2 Дня назад'}
              </Typography>
            </StyledCommentHeaderBox>
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
    </StyledList>
  );
};
