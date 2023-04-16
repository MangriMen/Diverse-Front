import { PostModel } from 'types/post';

export type PostSize = 'default' | 'small';

export interface PostProps {
  post: PostModel;
  setPost: (post: PostModel) => void;
  size?: PostSize;
}

export interface PostCardDescriptionProps {
  expanded: boolean;
  onExpand: () => void;
  size?: PostSize;
  description?: string;
}
