import { configureStore } from '@reduxjs/toolkit';
import { actsApi } from '../api/api';

export const store = configureStore({
  reducer: {
    [actsApi.reducerPath]: actsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(actsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;