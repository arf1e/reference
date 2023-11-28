import { Box, Container, Typography } from '@mui/material';
import BooksFilters from './BooksFilters';
import BooksList from './BooksList';

export default function Books() {
  return (
    <Box
      sx={{
        my: 4,
        p: 4,
        backgroundColor: 'lightskyblue',
        border: '2px dashed blue',
      }}
    >
      <Container>
        <Typography variant="h4">Books</Typography>
        <Box>
          <BooksFilters />
          <BooksList />
        </Box>
      </Container>
    </Box>
  );
}
