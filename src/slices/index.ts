import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { libraryApi } from '../api/library';
import cartReducer from './cartSlice';
import booksReducer from './booksSlice';

export const initiateStore = () =>
  configureStore({
    reducer: {
      [libraryApi.reducerPath]: libraryApi.reducer,
      cart: cartReducer,
      books: booksReducer,
    },
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(libraryApi.middleware);
    },
  });

export const store = initiateStore();
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
