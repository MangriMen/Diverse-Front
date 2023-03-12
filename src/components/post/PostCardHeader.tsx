import { Typography } from '@mui/material';

import { StyledAvatar, StyledPostCardHeaderBox } from './styles';

export const PostCardHeader = () => {
  return (
    <StyledPostCardHeaderBox>
      <StyledAvatar src="src/assets/images/lucy.jpg" />
      <Typography fontSize="20px">{'Username'}</Typography>
    </StyledPostCardHeaderBox>
  );
};
