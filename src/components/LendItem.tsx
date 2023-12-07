import { Box, Typography, useTheme } from '@mui/material';
import { BookType } from '../types/books';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import LendListControls from './LendListControls';

export default function LendItem({ book }: { book: BookType }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        borderRadius: 2,
        my: 2,
        p: 2,
        backgroundColor: composeBackgroundColor(theme, 1),
      }}
    >
      <img
        src={book.image}
        alt={book.title}
        style={{ width: '120px', height: '120px', objectFit: 'contain' }}
      />
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle1">{book.title}</Typography>
        <Typography variant="subtitle2">
          {book.authors.map((author) => author.name).join(', ')}
        </Typography>
        <LendListControls book={book} />
      </Box>
    </Box>
  );
}
