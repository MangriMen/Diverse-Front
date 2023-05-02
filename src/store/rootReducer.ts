import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from 'ducks/auth';
import { authApi } from 'ducks/auth/api';
import { commentApi } from 'ducks/comment/api';
import { dataApi } from 'ducks/data/api';
import { postApi } from 'ducks/post/api';
import { userApi } from 'ducks/user/api';

export const rootReducer = () => {
  return combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [dataApi.reducerPath]: dataApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  });
};
