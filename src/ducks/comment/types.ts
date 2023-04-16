import { GetPostPath } from 'ducks/post/types';

export interface SendCommentBody {
  content: string;
}

export interface SendCommentValues {
  path: GetPostPath;
  body: SendCommentBody;
}

export interface GetCommentParams {
  comment: string;
}

export interface GetCommentValues {
  path?: GetPostPath & GetCommentParams;
}

export interface UpdateCommentValues extends GetCommentValues {
  body: SendCommentBody;
}
