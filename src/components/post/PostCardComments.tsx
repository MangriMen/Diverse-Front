import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { post } from 'mocks/mockPosts';
import { useTranslation } from 'react-i18next';

import {
  StyledActionBox,
  StyledCommentHeaderBox,
  StyledIconButton,
  StyledLikeBox,
  StyledList,
  StyledTextButton,
} from './styles';

export const PostCardComments = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });
  return (
    <StyledList>
      {post.comments.map(item => (
        <ListItem key={item.id} alignItems="flex-start" disablePadding>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={
              <StyledCommentHeaderBox>
                <Typography fontSize="12px" padding="0 4px">
                  {item.user.username}
                </Typography>
                <Typography
                  variant="caption"
                  fontSize="11px"
                  color="common.dimmed"
                >
                  {item.created_at}
                </Typography>
              </StyledCommentHeaderBox>
            }
            secondary={
              <>
                <Typography fontSize="12px" variant="body2" padding="0 4px">
                  {item.description}
                </Typography>
                <StyledActionBox>
                  <StyledTextButton variant="text" fontsize="12px">
                    {t('reply')}
                  </StyledTextButton>
                  <StyledLikeBox>
                    <StyledIconButton disableRipple>
                      <FavoriteBorderIcon fontSize="small" />
                    </StyledIconButton>
                    <Typography fontSize="12px">{item.likes}</Typography>
                  </StyledLikeBox>
                </StyledActionBox>
              </>
            }
          />
        </ListItem>
      ))}
    </StyledList>
  );
};
