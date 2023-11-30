import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { libraryApi } from '../api/library';

export const initiateStore = () =>
  configureStore({
    reducer: {
      [libraryApi.reducerPath]: libraryApi.reducer,
    },
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(libraryApi.middleware);
    },
  });

export const store = initiateStore();
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
