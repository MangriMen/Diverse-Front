import { User } from './auth';

export interface CommentModel {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  likes: number;
  user: User;
  liked_by_me: boolean;
}

export interface PostModel {
  id: string;
  content: string;
  description: string;
  likes: number;
  created_at: string;
  user: User;
  comments: CommentModel[];
  liked_by_me: boolean;
}

export interface ServerGetPostsResponse {
  error: boolean;
  message: string;
  count: number;
  data: PostModel[];
}

export interface ServerGetPostResponse {
  error: boolean;
  message: string;
  data: PostModel;
}

export interface ServerGetCommentResponse {
  error: boolean;
  message: string;
  data: CommentModel;
}
