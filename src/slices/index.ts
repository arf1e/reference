import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { libraryApi } from '../api/library';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import cartReducer, { CartState } from './cartSlice';
import authReducer, { AuthState } from './authSlice';
import booksReducer from './booksSlice';
import genresReducer from './genresSlice';
import localforage from 'localforage';
import persistStore from 'redux-persist/es/persistStore';

const cartPersistConfig = {
  key: 'cart',
  storage: localforage,
};

const authPersistConfig = {
  key: 'auth',
  storage: localforage,
  blacklist: ['user'],
};

export const initiateStore = () =>
  configureStore({
    reducer: {
      [libraryApi.reducerPath]: libraryApi.reducer,
      cart: persistReducer<CartState, AnyAction>(
        cartPersistConfig,
        cartReducer
      ),
      books: booksReducer,
      auth: persistReducer<AuthState, AnyAction>(
        authPersistConfig,
        authReducer
      ),
      genres: genresReducer,
    },
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(libraryApi.middleware);
    },
  });

export const store = initiateStore();
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
