import { Box, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import useCartOverlay from '../hooks/useCartOverlay';
import { BookType } from '../types/books';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import LendListControls from './LendListControls';

export default function LendItem({ book }: { book: BookType }) {
  const theme = useTheme();
  const { hideCartOverlay } = useCartOverlay();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        borderRadius: 2,
        my: 2,
        backgroundColor: composeBackgroundColor(theme, 1),
        p: 2,
        transition: '0.3s',
      }}
    >
      <img
        src={book.image}
        alt={book.title}
        style={{ width: '120px', height: '120px', objectFit: 'contain' }}
      />
      <Box sx={{ ml: 2 }}>
        <Link
          to={`/books/${book.isbn}`}
          style={{ textDecoration: 'none' }}
          onClick={hideCartOverlay}
        >
          <Typography
            sx={{
              color: theme.palette.primary.main,
              transition: '0.3s',
              '&:hover': {
                color: theme.palette.primary.dark,
              },
            }}
            variant="subtitle1"
          >
            {book.title}
          </Typography>
        </Link>
        <Typography variant="subtitle2">
          {book.authors.map((author) => author.name).join(', ')}
        </Typography>
        <Typography variant="caption">
          {book.genres.map((genre) => genre.title).join(', ')}
        </Typography>
        <LendListControls book={book} />
      </Box>
    </Box>
  );
}
