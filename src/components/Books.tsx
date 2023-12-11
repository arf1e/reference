import { AddOutlined } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import BooksFilters from './BooksFilters';
import BooksList from './BooksList';

export default function Books() {
  const { isAdmin } = useAuth();
  return (
    <Box
      sx={{
        my: 4,
        p: 4,
      }}
    >
      <Container>
        <Typography variant="h4" component="h2" id="books">
          Books
        </Typography>
        <Box>
          {isAdmin && (
            <Box
              sx={{
                display: 'flex',
                mt: 2,
                mb: 1,
                justifyContent: 'flex-start',
              }}
            >
              <Link to="/books/new">
                <Button startIcon={<AddOutlined />}>Add a new book</Button>
              </Link>
            </Box>
          )}
          <BooksFilters />
          <BooksList />
        </Box>
      </Container>
    </Box>
  );
}
