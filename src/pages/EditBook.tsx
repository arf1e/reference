import { Box, Container, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetBookByIsbnQuery, useUpdateBookMutation } from '../api/library';
import BookForm from '../components/BookForm';
import Meta from '../components/Meta';
import useAuth from '../hooks/useAuth';
import Heading from '../styles/styled/Heading';
import { BookDto } from '../types/books';

export default function EditBook() {
  const { isbn } = useParams<{ isbn: string }>() as { isbn: string };
  const { jwt } = useAuth();
  const { data: getBookByIsbnResponse } = useGetBookByIsbnQuery(isbn);
  const [updateBook] = useUpdateBookMutation();

  const handleUpdateBook = async (book: BookDto) =>
    updateBook({ accessToken: jwt || '', book, isbn });
  return (
    <Box>
      <Container>
        <Meta pageTitle="Edit book" />
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12} md={10} lg={8} sx={{ my: 8 }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
              <Heading variant="h3" component="h1" alignSelf="center">
                Edit book
              </Heading>
            </Box>
            {getBookByIsbnResponse?.data && (
              <BookForm
                onSubmit={handleUpdateBook}
                successMessage="Book has been updated"
                providedValues={getBookByIsbnResponse.data}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
