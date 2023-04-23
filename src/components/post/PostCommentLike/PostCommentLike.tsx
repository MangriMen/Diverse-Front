import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { PostCommentLikeProps } from '../interfaces';
import { StyledIconButton, StyledLikeBox } from '../styles';

export const PostCommentLike = ({
  count,
  liked,
  variant = 'post',
  ...props
}: PostCommentLikeProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  const iconSize = variant === 'post' ? 'medium' : 'small';

  return (
    <StyledLikeBox component="span">
      <StyledIconButton title={t('like') ?? ''} disableRipple {...props}>
        {liked && (
          <FavoriteIcon sx={{ color: '#CF4B4F	' }} fontSize={iconSize} />
        )}
        {!liked && <FavoriteBorderIcon fontSize={iconSize} />}
      </StyledIconButton>
      <Typography
        component="span"
        fontSize={`${variant === 'post' ? '14px' : '12px'}`}
      >
        {count}
      </Typography>
    </StyledLikeBox>
  );
};
