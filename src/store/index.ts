import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { rootReducer } from './rootReducer';
import { rootQuery } from './rootQuery';

export const store = configureStore({
  reducer: rootReducer(),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(rootQuery),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
