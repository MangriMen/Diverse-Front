import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from 'ducks/auth';
import { authApi } from 'ducks/auth/api';
import { dataApi } from 'ducks/data/api';
import { postApi } from 'ducks/post/api';

export const rootReducer = () => {
  return combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [dataApi.reducerPath]: dataApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  });
};
