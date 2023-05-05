import { SvgIcon, SvgIconProps } from '@mui/material';

export interface PostCommentMenuAction {
  key: string;
  color?: SvgIconProps['color'];
  icon: typeof SvgIcon;
  callback?: () => void;
}

export interface PostCommentMenuActions {
  [x: string]: PostCommentMenuAction;
}

export interface PostCommentMenuItemProps {
  action: PostCommentMenuAction;
}
