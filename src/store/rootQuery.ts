import { authApi } from 'ducks/auth/api';
import { commentApi } from 'ducks/comment/api';
import { dataApi } from 'ducks/data/api';
import { postApi } from 'ducks/post/api';
import { userApi } from 'ducks/user/api';

export const rootQuery = [
  authApi.middleware,
  postApi.middleware,
  commentApi.middleware,
  userApi.middleware,
  dataApi.middleware,
];
