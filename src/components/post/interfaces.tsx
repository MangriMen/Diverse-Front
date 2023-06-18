import { PostModel } from 'types/post';

export type PostSize = 'fullscreen' | 'default' | 'small';

export interface PostProps {
  post: PostModel;
  size?: PostSize;
}
