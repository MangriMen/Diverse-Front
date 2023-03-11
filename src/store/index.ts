import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { rootQuery } from './rootQuery';
import { rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer(),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(rootQuery),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
