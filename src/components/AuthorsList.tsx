import { Grid, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllAuthorsQuery } from '../api/library';
import { RootState } from '../slices';
import {
  selectAuthorsFilters,
  selectAuthorsPagination,
  setAuthorsPage,
} from '../slices/authorsSlice';
import AuthorCard, { AuthorCardSkeleton } from './AuthorCard';
import DisplayError from './DisplayError';
import ListEmpty from './ListEmpty';

export const AUTHORS_PER_PAGE = 8;

const AUTHORS_LOADING = 'LOADING';
const AUTHORS_ERROR = 'ERROR';
const AUTHORS_LIST = 'LIST';
const AUTHORS_EMPTY = 'EMPTY';

type AuthorsState =
  | typeof AUTHORS_LOADING
  | typeof AUTHORS_ERROR
  | typeof AUTHORS_LIST
  | typeof AUTHORS_EMPTY;

export default function AuthorsList() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) =>
    selectAuthorsFilters(state.authors)
  );
  const [state, setState] = useState<AuthorsState>(AUTHORS_LOADING);

  const pagination = useSelector((state: RootState) =>
    selectAuthorsPagination(state.authors)
  );

  const handlePageChange = (page: number) => dispatch(setAuthorsPage(page));

  const {
    data: authorsResponse,
    isFetching,
    isError,
    error,
  } = useGetAllAuthorsQuery({
    ...filters,
    ...pagination,
    limit: AUTHORS_PER_PAGE,
  });

  useEffect(() => {
    if (isFetching) {
      setState(AUTHORS_LOADING);
      return;
    }

    if (isError) {
      setState(AUTHORS_ERROR);
      return;
    }

    if (authorsResponse?.data.authors.length === 0) {
      setState(AUTHORS_EMPTY);
      return;
    }

    setState(AUTHORS_LIST);
  }, [isFetching, isError, authorsResponse?.data.authors.length]);

  const renderSkeletons = () => {
    return new Array(AUTHORS_PER_PAGE / 2)
      .fill(0)
      .map((_item, index) => <AuthorCardSkeleton key={index} />);
  };

  return (
    <>
      {state === AUTHORS_LIST &&
        authorsResponse?.data.authors.map((author) => (
          <AuthorCard author={author} key={author._id} />
        ))}
      {state === AUTHORS_LOADING && renderSkeletons()}
      {state === AUTHORS_EMPTY && (
        <ListEmpty
          title="No authors found"
          description="Please try changing the filters."
        />
      )}
      {state === AUTHORS_ERROR && (
        <Grid item xs={12}>
          <DisplayError
            title="Uh oh, failed to fetch authors"
            errorOutput={error}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <Pagination
          count={authorsResponse?.data.pagination.totalPages}
          page={pagination.page}
          shape="rounded"
          sx={{ mt: 2 }}
          onChange={(_event, page) => handlePageChange(page)}
        />
      </Grid>
    </>
  );
}
