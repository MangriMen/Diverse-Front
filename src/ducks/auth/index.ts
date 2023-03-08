import { deleteAuthToken, getAuthToken, setAuthToken } from 'helpers/token';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ServerAuthResponse } from 'types/auth';

import { AuthState } from './types';

const initialState: AuthState = {
  user: null,
  isInit: !!getAuthToken(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    enter(state, action: PayloadAction<ServerAuthResponse>) {
      setAuthToken(action.payload.token);
      state.user = action.payload.user;
      state.isInit = true;
    },
    logout(state) {
      deleteAuthToken();
      state.isInit = false;
      state.user = null;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { enter, logout } = authSlice.actions;
