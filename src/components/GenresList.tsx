import { Grid, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllGenresQuery } from '../api/library';
import { RootState } from '../slices';
import {
  selectGenresFilters,
  selectGenresPagination,
  setGenresPage,
} from '../slices/genresSlice';
import DisplayError from './DisplayError';
import GenreCard from './GenreCard';
import ListEmpty from './ListEmpty';

export const GENRES_PER_PAGE = 8;

const GENRES_LOADING = 'LOADING';
const GENRES_ERROR = 'ERROR';
const GENRES_LIST = 'LIST';
const GENRES_EMPTY = 'EMPTY';

type GenresState =
  | typeof GENRES_LOADING
  | typeof GENRES_ERROR
  | typeof GENRES_LIST
  | typeof GENRES_EMPTY;

export default function GenresList() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) =>
    selectGenresFilters(state.genres)
  );
  const [state, setState] = useState<GenresState>(GENRES_LOADING);

  const pagination = useSelector((state: RootState) =>
    selectGenresPagination(state.genres)
  );

  const handlePageChange = (page: number) => dispatch(setGenresPage(page));

  const {
    data: genresResponse,
    isFetching,
    isError,
    error,
  } = useGetAllGenresQuery({
    ...filters,
    ...pagination,
    limit: GENRES_PER_PAGE,
  });

  useEffect(() => {
    if (isFetching) {
      setState(GENRES_LOADING);
      return;
    }

    if (isError) {
      setState(GENRES_ERROR);
      return;
    }

    if (genresResponse?.data.genres.length === 0) {
      setState(GENRES_EMPTY);
      return;
    }

    setState(GENRES_LIST);
  }, [isFetching, isError, genresResponse?.data.genres.length]);

  return (
    <>
      {state === GENRES_LIST &&
        genresResponse?.data.genres.map((genre) => (
          <GenreCard genre={genre} key={genre._id} />
        ))}
      {state === GENRES_EMPTY && (
        <ListEmpty
          title="No genres found"
          description="Please try changing the filters."
        />
      )}
      {state === GENRES_ERROR && (
        <Grid item xs={12}>
          <DisplayError
            title="Uh oh, failed to fetch genres"
            description="Something went wrong"
            errorOutput={error}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <Pagination
          count={genresResponse?.data.pagination.totalPages}
          page={pagination.page}
          shape="rounded"
          sx={{ mt: 2 }}
          onChange={(_event, page) => handlePageChange(page)}
        />
      </Grid>
    </>
  );
}
