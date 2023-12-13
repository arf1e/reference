import { configureStore } from '@reduxjs/toolkit';
import booksReducer, {
  setPage,
  initialState as initialBooksSliceState,
  selectFilters,
  selectPagination,
  setFilters,
  clearFilters,
} from '../../slices/booksSlice';
import { StatusType } from '../../types/books';

describe('pagination', () => {
  const store = configureStore({
    reducer: {
      books: booksReducer,
    },
  });

  it('should increment page', () => {
    const initialPage = selectPagination(store.getState().books).page;
    expect(initialPage).toBe(1);
    store.dispatch(setPage(2));
    expect(selectPagination(store.getState().books).page).toBe(2);
  });

  it('should decrement page', () => {
    const initialPage = store.getState().books.pagination.page;
    expect(initialPage).toBe(2);
    store.dispatch(setPage(1));
    expect(selectPagination(store.getState().books).page).toBe(1);
  });
});

describe('filters', () => {
  const store = configureStore({
    reducer: {
      books: booksReducer,
    },
  });

  it('should set filters', () => {
    const initialFilters = selectFilters(store.getState().books);
    expect(initialFilters).toMatchObject(initialBooksSliceState.filters);
    const payload = {
      title: 'test',
      status: 'available' as StatusType,
      genre: '',
      author: '',
    };
    store.dispatch(setFilters(payload));
    expect(selectFilters(store.getState().books)).toMatchObject(payload);
  });

  it('should clear filters', () => {
    const initialFilters = selectFilters(store.getState().books);
    expect(initialFilters).not.toMatchObject(initialBooksSliceState.filters);
    store.dispatch(clearFilters());
    expect(selectFilters(store.getState().books)).toMatchObject(
      initialBooksSliceState.filters
    );
  });
});
