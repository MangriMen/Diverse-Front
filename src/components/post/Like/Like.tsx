import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material';
import { StyledTextButton } from 'components/common/styles';
import { useTranslation } from 'react-i18next';

import { LikeProps } from './interfaces';

const FavoriteIconFilled = styled(FavoriteIcon)`
  color: ${props => props.theme.palette.common.like};
`;

const LikeButton = styled(StyledTextButton)`
  padding: 0 0.3rem;
  min-width: unset;
  & .MuiButton-startIcon {
    margin-left: 0;
  }
`;

export const Like = ({
  count,
  liked,
  variant = 'post',
  ...props
}: LikeProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  const iconSize = variant === 'post' ? 'large' : 'small';
  const fontSize = variant === 'post' ? '14px' : '12px';

  return (
    <LikeButton
      disableRipple
      size={iconSize}
      fontSize={fontSize}
      title={t('like') ?? ''}
      startIcon={liked ? <FavoriteIconFilled /> : <FavoriteBorderIcon />}
      {...props}
    >
      {count}
    </LikeButton>
  );
};
