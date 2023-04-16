import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from 'ducks/auth';
import { authApi } from 'ducks/auth/api';
import { commentApi } from 'ducks/comment/api';
import { postApi } from 'ducks/post/api';

export const rootReducer = () => {
  return combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  });
};
