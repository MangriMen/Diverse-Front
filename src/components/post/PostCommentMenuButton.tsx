import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton, IconButtonProps, styled } from '@mui/material';

const IconButtonStyled = styled(IconButton)`
  border-radius: 4px;
  margin-left: auto;
  transition: none;
  padding: 0;

  height: 21px;

  &:active {
    color: ${props => props.theme.palette.common.dimmed};
  }
`;

export const PostCommentMenuButton = ({ ...props }: IconButtonProps) => {
  return (
    <IconButtonStyled disableRipple {...props}>
      <MoreHorizIcon />
    </IconButtonStyled>
  );
};
