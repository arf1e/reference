import { Grid, Pagination } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllBooksQuery } from '../api/library';
import { AppDispatch, RootState } from '../slices';
import { selectFilters, selectPagination, setPage } from '../slices/booksSlice';
import BookCard, { BookCardSkeleton } from './BookCard';
import DisplayError from './DisplayError';
import ListEmpty from './ListEmpty';

export const BOOKS_PER_CATALOG_PAGE = 8;

const BOOKS_LOADING = 'LOADING';
const BOOKS_ERROR = 'ERROR';
const BOOKS_LIST = 'LIST';
const BOOKS_EMPTY = 'EMPTY';

type BooksListState =
  | typeof BOOKS_LOADING
  | typeof BOOKS_ERROR
  | typeof BOOKS_LIST
  | typeof BOOKS_EMPTY;

export default function BooksList() {
  const filters = useSelector((state: RootState) => selectFilters(state.books));
  const pagination = useSelector((state: RootState) =>
    selectPagination(state.books)
  );
  const dispatch = useDispatch<AppDispatch>();

  const handlePageChange = (value: number) => {
    dispatch(setPage(value));
  };

  const [state, setState] = useState<BooksListState>(BOOKS_LOADING);
  const {
    data: getAllBooksResponse,
    error,
    isFetching,
  } = useGetAllBooksQuery({
    ...filters,
    ...pagination,
    limit: BOOKS_PER_CATALOG_PAGE,
  });

  useEffect(() => {
    if (isFetching) {
      setState(BOOKS_LOADING);
      return;
    }

    if (error) {
      setState(BOOKS_ERROR);
      return;
    }

    if (getAllBooksResponse?.data.books.length === 0) {
      setState(BOOKS_EMPTY);
      return;
    }

    setState(BOOKS_LIST);
  }, [isFetching, error, getAllBooksResponse?.data.books.length]);

  const renderList = useMemo(
    () =>
      getAllBooksResponse?.data.books.map((book) => (
        <BookCard key={book._id} book={book} />
      )),
    [getAllBooksResponse?.data.books]
  );

  const renderSkeletons = useMemo(
    () =>
      new Array(BOOKS_PER_CATALOG_PAGE / 2)
        .fill(0)
        .map((_, index) => <BookCardSkeleton key={index} />),
    []
  );

  return (
    <Grid container spacing={4}>
      {state === BOOKS_LIST && renderList}
      {state === BOOKS_EMPTY && (
        <ListEmpty
          title="No books found."
          description="Please try updating the filters."
        />
      )}
      {state === BOOKS_LOADING && renderSkeletons}
      {state === BOOKS_ERROR && (
        <DisplayError
          errorOutput={error}
          title="Uh oh!"
          sx={{ my: 8, p: 2 }}
          description="Fetching books failed with an error. Most likely that's our fault."
        />
      )}
      <Grid item xs={12}>
        <Pagination
          count={getAllBooksResponse?.data.pagination.totalPages}
          page={pagination.page}
          shape="rounded"
          sx={{ mt: 2 }}
          onChange={(_event, page) => handlePageChange(page)}
        />
      </Grid>
    </Grid>
  );
}
