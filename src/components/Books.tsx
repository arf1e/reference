import { Box, Container, Typography } from '@mui/material';
import Heading from '../styles/styled/Heading';
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
        <Heading variant="h4" component="h2">
          Books
        </Heading>
        <Box>
          <BooksFilters />
          <BooksList />
        </Box>
      </Container>
    </Box>
  );
}
