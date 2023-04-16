import { MenuProps } from '@mui/material';
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

export interface PostCommentActionsProps extends MenuProps {
  editAction?: () => void;
  deleteAction?: () => void;
}
