import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useGetAllBooksQuery } from '../api/library';
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
  const [state, setState] = useState<BooksListState>(BOOKS_LOADING);
  const {
    data: getAllBooksResponse,
    error,
    isFetching,
  } = useGetAllBooksQuery();

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
  });

  return (
    <Box
      sx={{
        backgroundColor: 'lightgreen',
        border: '2px dashed green',
        minHeight: '24em',
      }}
    >
      <Typography variant="h5">Books List</Typography>
      {state === BOOKS_LIST &&
        getAllBooksResponse?.data.books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      <Typography variant="body2">{JSON.stringify(error)}</Typography>
    </Box>
  );
}
