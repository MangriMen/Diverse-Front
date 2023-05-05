import { IconButtonProps } from '@mui/material';

export interface LikeProps
  extends Pick<IconButtonProps, 'onClick' | 'disabled'> {
  variant?: 'post' | 'comment';
  count: number;
  liked: boolean;
}
