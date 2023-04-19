import { GetPostPath } from 'ducks/post/types';

export interface CreateCommentBody {
  content: string;
}

export interface CreateCommentRequest {
  path: GetPostPath;
  body: CreateCommentBody;
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
