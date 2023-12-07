import { Box, Grid, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { BookType } from '../types/books';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import LendListControls from './LendListControls';

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
            backgroundColor: composeBackgroundColor(theme, 1),
          }}
        >
          <img src={book.image} alt={book.title} width="100%" />
          <Typography
            variant="subtitle2"
            component="h4"
            sx={{ lineHeight: '120%', mb: 1, mt: 2 }}
          >
            {book.title}
          </Typography>
          <Typography variant="caption" component="p">
            {book.authors.map((author) => author.name).join(', ')}
          </Typography>
          <Typography variant="caption" component="p">
            {book.genres.map((genre) => genre.title).join(', ')}
          </Typography>
          {user && <LendListControls book={book} />}
        </Box>
      </Link>
    </Grid>
  );
}
