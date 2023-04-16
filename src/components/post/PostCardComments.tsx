import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Avatar, ListItem, ListItemText, Typography } from '@mui/material';
import { StyledTextButton } from 'components/common/styles';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { PostCardCommentsProps } from './interfaces';
import {
  ListItemAvatarStyled,
  StyledActionBox,
  StyledComment,
  StyledCommentHeaderBox,
  StyledIconButton,
  StyledLikeBox,
  StyledList,
} from './styles';

export const PostCardComments: FC<PostCardCommentsProps> = ({ comments }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });
  return (
    <StyledList>
      {comments.map(item => (
        <ListItem key={item.id} alignItems="flex-start" disablePadding>
          <ListItemAvatarStyled>
            <Avatar src={item.user.avatar_url} />
          </ListItemAvatarStyled>
          <ListItemText
            primary={
              <StyledCommentHeaderBox>
                <Typography component="span" fontSize="12px" padding="0 4px">
                  {item.user.username}
                </Typography>
                <Typography
                  component="span"
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
                <StyledComment
                  component="span"
                  fontSize="12px"
                  variant="body2"
                  padding="0 4px"
                >
                  {item.content}
                </StyledComment>
                <StyledActionBox component="span">
                  <StyledTextButton color="dimmed" fontSize="12px">
                    {t('reply')}
                  </StyledTextButton>
                  <StyledLikeBox component="span">
                    <StyledIconButton disableRipple>
                      <FavoriteBorderIcon fontSize="small" />
                    </StyledIconButton>
                    <Typography component="span" fontSize="12px">
                      {item.likes}
                    </Typography>
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
