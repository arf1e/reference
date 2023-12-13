import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaginationInput } from '../types/api';
import { AuthorFilters } from '../types/authors';

type AuthorsState = {
  filters: AuthorFilters;
  pagination: PaginationInput;
};

const initialState: AuthorsState = {
  filters: {
    name: '',
  },
  pagination: {
    page: 1,
  },
};

export const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<AuthorFilters>) => {
      state.filters = action.payload;
      state.pagination.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    clearFilters: () => {
      return initialState;
    },
  },
});

export const {
  setFilters: setAuthorsFilters,
  setPage: setAuthorsPage,
  clearFilters: clearAuthorsFilters,
} = authorsSlice.actions;
export const selectAuthorsFilters = (state: AuthorsState) => state.filters;
export const selectAuthorsPagination = (state: AuthorsState) =>
  state.pagination;

export default authorsSlice.reducer;
