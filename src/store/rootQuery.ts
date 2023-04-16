import { authApi } from 'ducks/auth/api';
import { commentApi } from 'ducks/comment/api';
import { postApi } from 'ducks/post/api';

export const rootQuery = [
  authApi.middleware,
  postApi.middleware,
  commentApi.middleware,
];
