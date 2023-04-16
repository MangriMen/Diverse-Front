import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Typography } from '@mui/material';
import { StyledTextButton } from 'components/common/styles';
import { post } from 'mocks/mockPosts';
import { useTranslation } from 'react-i18next';

import { StyledActionBox, StyledIconButton, StyledLikeBox } from './styles';

export const PostCardActions = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  return (
    <StyledActionBox>
      <StyledTextButton color="dimmed" fontSize="14px">
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
