import { Box, Card, Pagination, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllBooksQuery } from '../api/library';
import { AppDispatch, RootState } from '../slices';
import { selectFilters, selectPagination, setPage } from '../slices/booksSlice';
import composeBackgroundColor from '../utils/composeBackgroundColor';
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

  return (
    <>
      <Box sx={{ backgroundColor: composeBackgroundColor(theme, 1) }}>
        <Typography variant="h5">Books List</Typography>
        {state === BOOKS_LIST &&
          getAllBooksResponse?.data.books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        <Typography variant="body2">{JSON.stringify(error)}</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: composeBackgroundColor(theme, 1),
        }}
      >
        <Pagination
          count={getAllBooksResponse?.data.pagination.totalPages}
          page={pagination.page}
          onChange={(_event, page) => handlePageChange(page)}
        />
      </Box>
    </>
  );
}
