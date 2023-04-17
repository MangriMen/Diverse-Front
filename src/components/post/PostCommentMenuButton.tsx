import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton, IconButtonProps, styled } from '@mui/material';

export const PostCommentMenuButton = styled(({ ...props }: IconButtonProps) => {
  return (
    <IconButton disableRipple {...props}>
      <MoreHorizIcon />
    </IconButton>
  );
})<{}>`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  margin-right: 1px;
  margin-left: auto;
  transition: none;

  &:active {
    background-color: ${props => props.theme.palette.primary.light};
  }
`;
