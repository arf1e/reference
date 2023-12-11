import { Grid, Pagination, Typography, useTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllBooksQuery } from '../api/library';
import { AppDispatch, RootState } from '../slices';
import { selectFilters, selectPagination, setPage } from '../slices/booksSlice';
import BookCard from './BookCard';

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
  const theme = useTheme();
  const {
    data: getAllBooksResponse,
    error,
    isFetching,
  } = useGetAllBooksQuery({ ...filters, ...pagination });

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
    () => (
      <Grid container spacing={4}>
        {getAllBooksResponse?.data.books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </Grid>
    ),
    [getAllBooksResponse?.data.books]
  );

  return (
    <>
      {state === BOOKS_LIST && renderList}
      {state === BOOKS_EMPTY && <Typography>empty</Typography>}
      {state === BOOKS_LOADING && <Typography>loading</Typography>}
      {state === BOOKS_ERROR && <Typography>error</Typography>}
      <Pagination
        count={getAllBooksResponse?.data.pagination.totalPages}
        page={pagination.page}
        shape="rounded"
        sx={{ mt: 2 }}
        onChange={(_event, page) => handlePageChange(page)}
      />
    </>
  );
}
