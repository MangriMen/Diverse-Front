import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';

import { StyledInputBase, StyledPaper } from './styles';

export const PostCardInput = () => {
  return (
    <StyledPaper component="form" elevation={24}>
      <StyledInputBase placeholder="Написать комментарий..." />
      <IconButton disableRipple>
        <SendIcon />
      </IconButton>
    </StyledPaper>
  );
};
