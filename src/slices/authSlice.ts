import { createSlice } from '@reduxjs/toolkit';
import { libraryApi } from '../api/library';
import { UserType } from '../types/users';

export type AuthState = {
  accessToken: string | null;
  user: UserType | null;
};

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers(builder) {
    builder.addMatcher(
      libraryApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.data.accessToken;
      }
    );
    builder.addMatcher(
      libraryApi.endpoints.signup.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.data.accessToken;
      }
    );
    builder.addMatcher(
      libraryApi.endpoints.getMyProfile.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.data;
      }
    );
  },
});

export const selectUser = (state: AuthState) => state.user;
export const selectJwt = (state: AuthState) => state.accessToken;

export const { logout } = authSlice.actions;

export default authSlice.reducer;
