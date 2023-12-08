import { Container, Grid, Typography, useTheme } from '@mui/material';
import { BookType } from '../types/books';
import composeBackgroundColor from '../utils/composeBackgroundColor';

type Props = {
  book: BookType;
};

export default function BookData({ book }: Props) {
  const theme = useTheme();
  return (
    <Container sx={{ my: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <img src={book.image} alt={book.title} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            backgroundColor: composeBackgroundColor(theme, 1),
            borderRadius: 2,
            p: 2,
          }}
        >
          <Typography variant="h4" sx={{ mt: 2, mb: 1 }} component="h1">
            {book.title}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
