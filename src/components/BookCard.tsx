import { Box, Grid, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { BookType } from '../types/books';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import composeHoverBackgroundColor from '../utils/composeHoverBackgroundColor';
import LendListControls from './LendListControls';
import StatusChip from './StatusChip';

type Props = {
  book: BookType;
};

export default function BookCard({ book }: Props) {
  const theme = useTheme();
  const { user } = useAuth();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Link to={`/books/${book.isbn}`} style={{ textDecoration: 'none' }}>
        <Box
          component="article"
          sx={{
            color: theme.palette.text.primary,
            p: 2,
            borderRadius: 2,
            transition: '0.3s',
            backgroundColor: composeBackgroundColor(theme, 1),
            '&:hover': {
              backgroundColor: composeHoverBackgroundColor(theme, 1),
              '& img': {
                transform: 'scale(0.97)',
              },
            },
          }}
        >
          <img
            src={book.image}
            alt={book.title}
            width="100%"
            style={{ transition: '0.3s' }}
          />
          <StatusChip book={book} size="small" sx={{ my: 1 }} />
          <Typography
            variant="subtitle2"
            component="h4"
            sx={{ lineHeight: '120%', mb: 1 }}
          >
            {book.title}
          </Typography>
          <Typography variant="caption" component="p">
            {book.authors.map((author) => author.name).join(', ')}
          </Typography>
          <Typography variant="caption" component="p">
            {book.genres.map((genre) => genre.title).join(', ')}
          </Typography>
          {user && <LendListControls book={book} sx={{ mt: 2 }} />}{' '}
        </Box>
      </Link>
    </Grid>
  );
}
