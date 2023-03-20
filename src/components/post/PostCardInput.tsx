import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { StyledInputBase, StyledPaper } from './styles';

export const PostCardInput = () => {
  return (
    <StyledPaper component="form" elevation={24}>
      <StyledInputBase />
      <IconButton disableRipple>
        <SendIcon />
      </IconButton>
    </StyledPaper>
  );
};
