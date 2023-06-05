import { PostModel } from 'types/post';

export type PostSize = 'default' | 'small';

export interface PostProps {
  post: PostModel;
  size?: PostSize;
}
