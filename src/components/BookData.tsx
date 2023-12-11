import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Container, Grid, Grow, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { BookType } from '../types/books';
import getPublishedYear from '../utils/getPublishedYear';
import AdminBookControls from './AdminBookControls';
import LendListControls from './LendListControls';
import StatusChip from './StatusChip';

type Props = {
  book: BookType;
};

export default function BookData({ book }: Props) {
  const { user } = useAuth();
  return (
    <Grow in={true}>
      <Container sx={{ my: 8 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} mb={1}>
            <Link to={`/#books`}>
              <Button startIcon={<ChevronLeft />}>Back to catalog</Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <img
              src={book.image}
              alt={book.title}
              style={{
                display: 'inline-flex',
                width: '100%',
                maxWidth: '320px',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box
              sx={{
                borderRadius: 2,
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <StatusChip
                book={book}
                sx={{ alignSelf: 'flex-start', mb: 2 }}
                size="small"
              />
              <Typography variant="body1">
                {book.authors.map((author) => author.name).join(', ')}
              </Typography>
              <Typography
                variant="h4"
                sx={{ mb: 1, fontWeight: 'bold', maxWidth: '80%' }}
                component="h1"
              >
                {book.title}
              </Typography>
              {user && <LendListControls sx={{ mb: 2 }} book={book} />}
              <Typography variant="caption">ISBN</Typography>
              <Typography variant="body1" mb={1}>
                {book.isbn}
              </Typography>
              <Typography variant="caption">Publisher</Typography>
              <Typography variant="body1" mb={1}>
                {book.publisher}
              </Typography>
              <Typography variant="caption">Published year</Typography>
              <Typography variant="body1" mb={1}>
                {getPublishedYear(book.publishedDate)}
              </Typography>
              <AdminBookControls book={book} mt={4} alignSelf="flex-start" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}
