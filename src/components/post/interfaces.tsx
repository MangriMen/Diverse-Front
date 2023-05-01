import {
  CardMediaProps,
  IconButtonProps,
  SvgIcon,
  SvgIconProps,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { PostModel } from 'types/post';

export type PostSize = 'default' | 'small';

export interface PostProps {
  post: PostModel;
  setPost: Dispatch<SetStateAction<PostModel>>;
  size?: PostSize;
}

export interface PostCardDescriptionProps {
  expanded: boolean;
  onExpand: () => void;
  size?: PostSize;
  description?: string;
}

export interface PostCommentMenuAction {
  key: string;
  color?: SvgIconProps['color'];
  icon: typeof SvgIcon;
  callback?: () => void;
}

export interface PostCommentMenuActions {
  [x: string]: PostCommentMenuAction;
}

export interface PostCommentLikeProps {
  variant?: 'post' | 'comment';
  count: number;
  liked: boolean;
  onClick: IconButtonProps['onClick'];
  disabled: IconButtonProps['disabled'];
}

export interface MediaSkeletonProps {
  isLoading: boolean;
}

export interface CardMediaSkeletonProps extends MediaSkeletonProps {
  size?: PostSize;
}

export interface StyledCardMediaBoxProps {
  size: PostSize;
}

export type PostCardMediaProps = StyledCardMediaBoxProps &
  Pick<CardMediaProps, 'image'>;
