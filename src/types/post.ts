import { User } from './auth';

export interface CommentModel {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  likes: number;
  user: User;
}

export interface PostModel {
  id: string;
  content: string;
  description: string;
  likes: number;
  created_at: string;
  user: User;
  comments: CommentModel[];
  liked_by_me: true;
}

export interface ServerGetPostsResponse {
  error: boolean;
  message: string;
  count: number;
  posts: PostModel[];
}

export interface ServerGetPostResponse {
  error: boolean;
  message: string;
  post: PostModel;
}
