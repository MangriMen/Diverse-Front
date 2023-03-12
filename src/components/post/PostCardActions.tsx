import { Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import {
  StyledActionBox,
  StyledIconButton,
  StyledLikeBox,
  StyledTextButton,
} from './styles';
export const PostCardActions = () => {
  return (
    <StyledActionBox>
      <StyledTextButton variant="text">{'Поделиться'}</StyledTextButton>
      <StyledLikeBox>
        <StyledIconButton disableRipple>
          <FavoriteBorderIcon />
        </StyledIconButton>
        <Typography fontSize="14px">{'999K'}</Typography>
      </StyledLikeBox>
    </StyledActionBox>
  );
};
