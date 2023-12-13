import { configureStore } from '@reduxjs/toolkit';
import authorsReducer, {
  setAuthorsPage,
  setAuthorsFilters,
  initialState as initialAuthorsSliceState,
  clearAuthorsFilters,
  selectAuthorsPagination,
  selectAuthorsFilters,
} from '../../slices/authorsSlice';

describe('pagination', () => {
  const store = configureStore({
    reducer: {
      authors: authorsReducer,
    },
  });

  it('should increment page', () => {
    const initialPage = selectAuthorsPagination(store.getState().authors).page;
    expect(initialPage).toBe(1);
    store.dispatch(setAuthorsPage(2));
    expect(selectAuthorsPagination(store.getState().authors).page).toBe(2);
  });

  it('should decrement page', () => {
    const initialPage = selectAuthorsPagination(store.getState().authors).page;
    expect(initialPage).toBe(2);
    store.dispatch(setAuthorsPage(1));
    expect(selectAuthorsPagination(store.getState().authors).page).toBe(1);
  });
});

describe('filters', () => {
  const store = configureStore({
    reducer: {
      authors: authorsReducer,
    },
  });

  it('sets filters', () => {
    const initialFilters = selectAuthorsFilters(store.getState().authors);
    expect(initialFilters).toMatchObject(initialAuthorsSliceState.filters);
    const payload = {
      name: 'charles',
    };
    store.dispatch(setAuthorsFilters(payload));
    expect(selectAuthorsFilters(store.getState().authors)).toMatchObject(
      payload
    );
  });

  it('clears filters', () => {
    const initialFilters = selectAuthorsFilters(store.getState().authors);
    expect(initialFilters).not.toMatchObject(initialAuthorsSliceState.filters);
    store.dispatch(clearAuthorsFilters());
    expect(selectAuthorsFilters(store.getState().authors)).toMatchObject(
      initialAuthorsSliceState.filters
    );
  });
});
