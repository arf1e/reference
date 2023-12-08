import { Box, Button, Divider, Typography } from '@mui/material';
import pluralize from 'pluralize';
import { useReturnBooksMutation } from '../api/library';
import useAuth from '../hooks/useAuth';
import useOwnership from '../hooks/useOwnership';
import useToaster from '../hooks/useToaster';
import { ApiResponse } from '../types/api';
import { BookType } from '../types/books';
import { UserType } from '../types/users';
import handleAsyncOperation from '../utils/handleAsyncOperation';

type Props = {
  borrower: UserType;
};

export default function BorrowedBooks({ borrower }: Props) {
  const books = borrower.borrowedBooks;
  const returnAllowed = useOwnership(borrower._id);
  const { jwt } = useAuth();
  const { showSuccessMessage } = useToaster();
  const [returnBooks] = useReturnBooksMutation();

  const handleReturn = async (books: BookType[]) => {
    const bookIds = books.map((book) => book._id);
    await handleAsyncOperation(
      () =>
        returnBooks({
          bookIds,
          userId: borrower._id,
          accessToken: jwt || '',
        }),
      {
        onSuccess: (
          result: ApiResponse<{ data: { returnedBooks: string[] } }>
        ) => {
          const booksQty = result.data.data.returnedBooks.length;
          showSuccessMessage(
            `Successfully returned ${booksQty} ${pluralize('book', booksQty)}`
          );
        },
        onError: console.error,
      }
    );
  };

  return (
    <Box>
      {books.map((book) => (
        <Box key={book._id}>
          <Typography variant="subtitle1">{book.title}</Typography>
          {returnAllowed && (
            <Button
              variant="contained"
              color="error"
              onClick={() => handleReturn([book])}
            >
              Return
            </Button>
          )}
        </Box>
      ))}
      <Divider />
      <Box>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleReturn(books)}
        >
          Return all {books.length} {pluralize('book', books.length)}
        </Button>
      </Box>
    </Box>
  );
}
