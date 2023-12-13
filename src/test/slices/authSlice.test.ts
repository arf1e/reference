import { configureStore } from '@reduxjs/toolkit';
import authReducer, { logout } from '../../slices/authSlice';
import { libraryApi } from '../../api/library';
import mockServer from '../mocks/server';
import {
  adminFixture,
  failingUser,
  jwtFixture,
  newUserFixture,
  passingUser,
} from '../__fixtures__/auth';

describe('authSlice', () => {
  const store = configureStore({
    reducer: {
      [libraryApi.reducerPath]: libraryApi.reducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(libraryApi.middleware),
  });

  beforeAll(() => {
    mockServer.listen();
  });

  afterEach(() => {
    store.dispatch(logout());
    mockServer.resetHandlers();
    store.dispatch(libraryApi.util.resetApiState());
  });

  it('should set JWT params after successfull login', async () => {
    const initialState = store.getState();
    expect(initialState.auth.accessToken).toBeNull();
    await store.dispatch(libraryApi.endpoints.login.initiate(passingUser));
    expect(store.getState().auth.accessToken).toEqual(jwtFixture.accessToken);
  });

  it('should not affect state after failed login', async () => {
    const initialState = store.getState();
    expect(initialState.auth.accessToken).toBeNull();
    await store.dispatch(libraryApi.endpoints.login.initiate(failingUser));
    expect(store.getState().auth.accessToken).toBeNull();
  });

  it('should set user object to store after querying for my profile with jwt', async () => {
    await store.dispatch(libraryApi.endpoints.login.initiate(passingUser));
    const { accessToken } = store.getState().auth;
    await store.dispatch(
      libraryApi.endpoints.getMyProfile.initiate(accessToken as string)
    );
    expect(store.getState().auth.user).toMatchObject(adminFixture);
  });

  it('should set JWT after successfull signup', async () => {
    await store.dispatch(libraryApi.endpoints.signup.initiate(newUserFixture));
    expect(store.getState().auth.accessToken).toEqual(jwtFixture.accessToken);
  });

  it('should clear JWT and user object after logout', async () => {
    await store.dispatch(libraryApi.endpoints.login.initiate(passingUser));
    const { accessToken } = store.getState().auth as { accessToken: string };
    await store.dispatch(
      libraryApi.endpoints.getMyProfile.initiate(accessToken as string)
    );
    expect(store.getState().auth.user).toMatchObject(adminFixture);
    store.dispatch(logout());
    expect(store.getState().auth.accessToken).toBeNull();
    expect(store.getState().auth.user).toBeNull();
  });
});
