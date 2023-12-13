import { DoneAllOutlined } from '@mui/icons-material';
import { Box, Button, Divider, Fade, Grid, Typography } from '@mui/material';
import pluralize from 'pluralize';
import { TransitionGroup } from 'react-transition-group';
import { useReturnBooksMutation } from '../api/library';
import useAuth from '../hooks/useAuth';
import useOwnership from '../hooks/useOwnership';
import useToaster from '../hooks/useToaster';
import { ApiResponse } from '../types/api';
import { BookType } from '../types/books';
import { UserType } from '../types/users';
import handleAsyncOperation from '../utils/handleAsyncOperation';
import BorrowedBookCard from './BorrowedBookCard';

type Props = {
  borrower: UserType;
};

export default function BorrowedBooks({ borrower }: Props) {
  const books = borrower.borrowedBooks;
  const returnAllowed = useOwnership(borrower._id);
  const { jwt } = useAuth();
  const { showSuccessMessage, showErrorMessage } = useToaster();
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
            `Returned ${booksQty} ${pluralize('book', booksQty)}`
          );
        },
        onError: showErrorMessage,
      }
    );
  };

  return (
    <Fade in={true} mountOnEnter unmountOnExit>
      <Box>
        <Typography
          variant="h5"
          component="h2"
          sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}
        >
          Borrowed books
        </Typography>
        <Grid container sx={{ py: 2 }} spacing={2}>
          <TransitionGroup component={null}>
            {books.map((book) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={book._id}
                component={Fade}
              >
                <div>
                  <BorrowedBookCard
                    book={book}
                    key={book._id}
                    returnAllowed={returnAllowed}
                    onReturn={() => handleReturn([book])}
                  />
                </div>
              </Grid>
            ))}
          </TransitionGroup>
          {returnAllowed && (
            <Grid item xs={12} mt={4} mb={8}>
              <Divider />
              <Button
                sx={{ mt: 2 }}
                color="primary"
                variant="contained"
                disableElevation
                startIcon={<DoneAllOutlined />}
                onClick={() => handleReturn(books)}
              >
                Return all books
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </Fade>
  );
}
