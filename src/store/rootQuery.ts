import { authApi } from 'ducks/auth/api';
import { postApi } from 'ducks/post/api';

export const rootQuery = [authApi.middleware, postApi.middleware];
