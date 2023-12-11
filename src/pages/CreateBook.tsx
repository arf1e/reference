import { ChevronLeft } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCreateBookMutation } from '../api/library';
import BookForm from '../components/BookForm';
import FormPage from '../components/FormPage';
import useAuth from '../hooks/useAuth';
import { BookDto } from '../types/books';

export default function CreateBook() {
  const { jwt } = useAuth();
  const [createBook] = useCreateBookMutation();
  const handleCreateBook = async (book: BookDto) =>
    createBook({ accessToken: jwt || '', book });
  return (
    <FormPage title="Add a new book">
      <Box alignItems="flex-start" mb={1}>
        <Link to="/">
          <Button startIcon={<ChevronLeft />}>Back to main</Button>
        </Link>
      </Box>
      <BookForm
        onSubmit={handleCreateBook}
        successMessage="New book has been added"
      />
    </FormPage>
  );
}
