import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { BookType } from '../types/books';

type Props = {
  book: BookType;
};

export default function BookCard({ book }: Props) {
  return (
    <Box sx={{ width: 240, height: 300, bgcolor: 'primary.main' }}>
      <Typography variant="h6">{book.title}</Typography>
      <Link to={`/books/${book.isbn}`}>
        <Typography variant="body2">{book.isbn}</Typography>
      </Link>
    </Box>
  );
}
