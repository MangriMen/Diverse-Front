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
      <ListItem alignItems="flex-start" sx={{ p: '0' }}>
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <ListItemText
          primary={
            <StyledCommentHeaderBox>
              <Typography fontSize="12px">{'Username'}</Typography>
              <Typography
                variant="caption"
                fontSize="9px"
                color="common.dimmed"
              >
                {'2 Дня назад'}
              </Typography>
            </StyledCommentHeaderBox>
          }
          secondary={
            <Typography fontSize="12px" variant="body2">
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
