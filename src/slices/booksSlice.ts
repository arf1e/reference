import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaginationInput } from '../types/api';
import { BookFilters } from '../types/books';

type BooksState = {
  filters: BookFilters;
  pagination: PaginationInput;
};

export const initialState: BooksState = {
  filters: {
    title: '',
    genre: '',
    author: '',
    status: '',
  },
  pagination: {
    page: 1,
  },
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<BookFilters>) => {
      state.filters = action.payload;
      state.pagination.page = 1;
    },

    clearFilters: () => {
      return initialState;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
  },
});

export const selectFilters = (state: BooksState) => state.filters;
export const selectPagination = (state: BooksState) => state.pagination;

export const { setFilters, setPage, clearFilters } = booksSlice.actions;

export default booksSlice.reducer;
