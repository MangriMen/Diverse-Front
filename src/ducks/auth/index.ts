import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from 'consts';
import { storageGet, storageRemove, storageSet } from 'helpers/localStorage';
import { ServerAuthResponse } from 'types/auth';

import { AuthState } from './types';

const initialState: AuthState = {
  user: storageGet(STORAGE_KEYS.USER),
  isInit: !!storageGet(STORAGE_KEYS.TOKEN),
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    enter(state, action: PayloadAction<ServerAuthResponse>) {
      storageSet(STORAGE_KEYS.TOKEN, action.payload.token);
      storageSet(STORAGE_KEYS.USER, action.payload.user);
      state.user = action.payload.user;
      state.isInit = true;
    },
    logout(state) {
      storageRemove(STORAGE_KEYS.TOKEN);
      storageRemove(STORAGE_KEYS.USER);
      state.isInit = false;
      state.user = null;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { enter, logout } = authSlice.actions;
