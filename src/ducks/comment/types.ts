import { GetPostPath } from 'ducks/post/types';

export interface GetCommentsParams {
  last_seen_comment_id?: string;
  last_seen_comment_created_at?: string;
  count: number;
}

export interface GetCommentsRequest {
  path: GetPostPath;
  params: GetCommentsParams;
}

export interface CreateCommentBody {
  content: string;
}

export interface CreateCommentRequest {
  path: GetPostPath;
  body: CreateCommentBody;
}

export interface GetCommentsCountPath {
  post: string;
}

export interface GetCommentsCountRequest {
  path: GetCommentsCountPath;
}

export interface GetCommentPath {
  comment: string;
}

export interface GetCommentRequest {
  path: GetPostPath & GetCommentPath;
}

export interface UpdateCommentRequest extends GetCommentRequest {
  body: CreateCommentBody;
}
