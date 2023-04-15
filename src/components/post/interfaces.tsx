import { CommentModel, PostModel } from 'types/post';

export type PostSize = 'default' | 'small';

export interface PostProps {
  post: PostModel;
  size?: PostSize;
}

export interface PostCardDescriptionProps {
  expanded: boolean;
  handleExpandClick: () => void;
  description?: string;
}

export interface PostCardCommentsProps {
  comments: CommentModel[];
}
