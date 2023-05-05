import { CardMediaProps } from '@mui/material';
import { PostProps } from 'components/post/interfaces';

export interface MediaSkeletonProps {
  isLoading: boolean;
}

export type CardMediaSkeletonProps = MediaSkeletonProps &
  Pick<PostProps, 'size'>;

export type CardMediaBoxProps = Pick<PostProps, 'size'>;

export type PostCardMediaProps = CardMediaBoxProps &
  Pick<CardMediaProps, 'image'>;

export interface PostCardDescriptionProps {
  expanded: boolean;
  onExpand: () => void;
  description?: string;
}
