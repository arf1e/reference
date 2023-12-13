import { configureStore } from '@reduxjs/toolkit';
import genresReducer, {
  setGenresPage,
  setGenresFilters,
  initialState as initialGenresSliceState,
  clearGenresFilters,
  selectGenresPagination,
  selectGenresFilters,
} from '../../slices/genresSlice';

describe('pagination', () => {
  const store = configureStore({
    reducer: {
      genres: genresReducer,
    },
  });

  it('should increment page', () => {
    const initialPage = selectGenresPagination(store.getState().genres).page;
    expect(initialPage).toBe(1);
    store.dispatch(setGenresPage(2));
    expect(selectGenresPagination(store.getState().genres).page).toBe(2);
  });

  it('should decrement page', () => {
    const initialPage = selectGenresPagination(store.getState().genres).page;
    expect(initialPage).toBe(2);
    store.dispatch(setGenresPage(1));
    expect(selectGenresPagination(store.getState().genres).page).toBe(1);
  });
});

describe('filters', () => {
  const store = configureStore({
    reducer: {
      genres: genresReducer,
    },
  });

  it('sets filters', () => {
    const initialFilters = selectGenresFilters(store.getState().genres);
    expect(initialFilters).toMatchObject(initialGenresSliceState.filters);
    const payload = {
      title: 'software',
    };
    store.dispatch(setGenresFilters(payload));
    expect(selectGenresFilters(store.getState().genres)).toMatchObject(payload);
  });

  it('clears filters', () => {
    const initialFilters = selectGenresFilters(store.getState().genres);
    expect(initialFilters).not.toMatchObject(initialGenresSliceState.filters);
    store.dispatch(clearGenresFilters());
    expect(selectGenresFilters(store.getState().genres)).toMatchObject(
      initialGenresSliceState.filters
    );
  });
});
