import { authApi } from 'ducks/auth/api';
import { dataApi } from 'ducks/data/api';
import { postApi } from 'ducks/post/api';

export const rootQuery = [
  authApi.middleware,
  dataApi.middleware,
  postApi.middleware,
];
