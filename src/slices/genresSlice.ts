import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaginationInput } from '../types/api';
import { GenreFilters } from '../types/genres';

type GenresState = {
  filters: GenreFilters;
  pagination: PaginationInput;
};

const initialState: GenresState = {
  filters: {
    title: '',
  },
  pagination: {
    page: 1,
  },
};

export const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<GenreFilters>) => {
      state.filters = action.payload;
      state.pagination.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination = {
        page: action.payload,
      };
    },
    clearFilters: () => {
      return initialState;
    },
  },
});

export const {
  setFilters: setGenresFilters,
  setPage: setGenresPage,
  clearFilters: clearGenresFilters,
} = genresSlice.actions;

export const selectGenresFilters = (state: GenresState) => state.filters;
export const selectGenresPagination = (state: GenresState) => state.pagination;

export default genresSlice.reducer;
