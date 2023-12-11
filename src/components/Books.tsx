import { Box, Container, Typography } from '@mui/material';
import BooksFilters from './BooksFilters';
import BooksList from './BooksList';

export default function Books() {
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
          <BooksFilters />
          <BooksList />
        </Box>
      </Container>
    </Box>
  );
}
