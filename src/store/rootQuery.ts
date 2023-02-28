import { authApi } from 'ducks/auth/api';

export const rootQuery = [authApi.middleware];
