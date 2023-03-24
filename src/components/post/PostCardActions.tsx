import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Typography } from '@mui/material';
import { post } from 'mocks/mockPosts';
import { useTranslation } from 'react-i18next';

import {
  StyledActionBox,
  StyledIconButton,
  StyledLikeBox,
  StyledTextButton,
} from './styles';

export const PostCardActions = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  return (
    <StyledActionBox>
      <StyledTextButton fontsize="14px" variant="text">
        {t('share')}
      </StyledTextButton>
      <StyledLikeBox>
        <StyledIconButton disableRipple>
          <FavoriteBorderIcon />
        </StyledIconButton>
        <Typography fontSize="14px">{post.likes}</Typography>
      </StyledLikeBox>
    </StyledActionBox>
  );
};
