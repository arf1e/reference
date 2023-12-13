import { Grid, Pagination } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useGetAllBooksQuery } from '../api/library';
import { AuthorType } from '../types/authors';
import { BookFilters } from '../types/books';
import { GenreType } from '../types/genres';
import BookCard, { BookCardSkeleton } from './BookCard';
import DisplayError from './DisplayError';
import ListEmpty from './ListEmpty';

type Props = {
  genre?: GenreType;
  author?: AuthorType;
};

const defaultValues: BookFilters = {
  title: '',
  status: '',
  author: '',
  genre: '',
};

export const BOOKS_PER_SPECIFIED_PAGE = 8;

const BOOKS_LOADING = 'LOADING';
const BOOKS_ERROR = 'ERROR';
const BOOKS_LIST = 'LIST';
const BOOKS_EMPTY = 'EMPTY';

type BooksListState =
  | typeof BOOKS_LOADING
  | typeof BOOKS_ERROR
  | typeof BOOKS_LIST
  | typeof BOOKS_EMPTY;

export default function BooksBy({ genre, author }: Props) {
  const [page, setPage] = useState(1);
  const [state, setState] = useState<BooksListState>(BOOKS_LOADING);

  const {
    data: booksResponse,
    isFetching,
    isError,
    error,
  } = useGetAllBooksQuery({
    ...defaultValues,
    ...(genre && { genre: genre._id }),
    ...(author && { author: author._id }),
    page,
    limit: BOOKS_PER_SPECIFIED_PAGE,
  });

  useEffect(() => {
    if (isFetching) {
      setState(BOOKS_LOADING);
      return;
    }

    if (isError) {
      setState(BOOKS_ERROR);
      return;
    }

    if (booksResponse?.data.books.length === 0) {
      setState(BOOKS_EMPTY);
      return;
    }

    setState(BOOKS_LIST);
  }, [isFetching, isError, booksResponse?.data.books.length]);

  const renderList = useMemo(
    () =>
      booksResponse?.data.books.map((book) => (
        <BookCard key={book._id} book={book} />
      )),
    [booksResponse?.data.books]
  );

  const renderSkeletons = useMemo(
    () =>
      new Array(BOOKS_PER_SPECIFIED_PAGE / 2)
        .fill(0)
        .map((_, index) => <BookCardSkeleton key={index} />),
    []
  );

  return (
    <Grid container spacing={4}>
      {state === BOOKS_LIST && renderList}
      {state === BOOKS_EMPTY && (
        <ListEmpty
          title={`No books found by this ${genre ? 'genre' : 'author'}.`}
          description="Please wait until we add something."
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
          count={booksResponse?.data.pagination.totalPages}
          page={page}
          shape="rounded"
          sx={{ mt: 2 }}
          onChange={(_event, page) => setPage(page)}
        />
      </Grid>
    </Grid>
  );
}
