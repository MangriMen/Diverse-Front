import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton, IconButtonProps, styled } from '@mui/material';

const IconButtonStyled = styled(IconButton)<{ visibility: string }>`
  visibility: ${props => props.visibility};

  margin-left: auto;
  transition: none;
  padding: 0;

  &:hover {
    filter: brightness(80%);
  }

  &:active {
    filter: brightness(60%);
  }
`;

const MoreHorizIconStyled = styled(MoreHorizIcon)`
  height: auto;
`;

export interface PostCommentMenuButtonProps extends IconButtonProps {
  visibility: string;
}

export const PostCommentMenuButton = ({
  ...props
}: PostCommentMenuButtonProps) => {
  return (
    <IconButtonStyled disableRipple {...props}>
      <MoreHorizIconStyled />
    </IconButtonStyled>
  );
};
