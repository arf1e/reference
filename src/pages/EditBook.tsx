import { ChevronLeft } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useGetBookByIsbnQuery, useUpdateBookMutation } from '../api/library';
import BookForm from '../components/BookForm';
import FormPage from '../components/FormPage';
import useAuth from '../hooks/useAuth';
import { BookDto } from '../types/books';

export default function EditBook() {
  const { isbn } = useParams<{ isbn: string }>() as { isbn: string };
  const { jwt } = useAuth();
  const { data: getBookByIsbnResponse } = useGetBookByIsbnQuery(isbn);
  const [updateBook] = useUpdateBookMutation();

  const handleUpdateBook = async (book: BookDto) =>
    updateBook({ accessToken: jwt || '', book, isbn });
  return (
    <FormPage title="Edit Book">
      <Box sx={{ mb: 1, display: 'flex', justifyContent: 'flex-start' }}>
        <Link to={`/books/${isbn}`}>
          <Button startIcon={<ChevronLeft />}>Go back to the book page</Button>
        </Link>
      </Box>
      {getBookByIsbnResponse?.data && (
        <BookForm
          onSubmit={handleUpdateBook}
          successMessage="Book has been updated"
          providedValues={getBookByIsbnResponse.data}
        />
      )}
    </FormPage>
  );
}
