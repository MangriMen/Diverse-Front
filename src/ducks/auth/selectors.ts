import { RootState } from 'store';

export const selectIsAuth = (state: RootState) => !!state.auth.user;

export const selectUser = (state: RootState) => state.auth.user;
