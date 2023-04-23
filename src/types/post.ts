import { User } from './auth';
import { ServerBaseResponse } from './base';

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

export interface ServerGetPostResponse extends ServerBaseResponse {
  data: PostModel;
}

export interface ServerGetCommentResponse extends ServerBaseResponse {
  data: CommentModel;
}
