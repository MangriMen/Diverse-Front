import { RootState } from 'store/store';

export const selectIsAuth = (state: RootState) => !!state.auth.userId;
