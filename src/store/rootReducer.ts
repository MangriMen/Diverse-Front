import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from 'ducks/auth';
import { authApi } from 'ducks/auth/api';

export const rootReducer = () => {
  return combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  });
};
