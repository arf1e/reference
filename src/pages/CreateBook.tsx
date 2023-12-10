import { Box, Grid } from '@mui/material';
import { Container } from '@mui/system';
import { useCreateBookMutation } from '../api/library';
import BookForm from '../components/BookForm';
import useAuth from '../hooks/useAuth';
import Heading from '../styles/styled/Heading';
import { BookDto } from '../types/books';

export default function CreateBook() {
  const { jwt } = useAuth();
  const [createBook] = useCreateBookMutation();
  const handleCreateBook = async (book: BookDto) => {
    await createBook({ accessToken: jwt || '', book });
  };
  return (
    <Box>
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6} sx={{ my: 8 }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
              <Heading variant="h3" component="h1" alignSelf="center">
                Add a new book
              </Heading>
            </Box>
            <BookForm
              onSubmit={handleCreateBook}
              successMessage="New book has been added"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
