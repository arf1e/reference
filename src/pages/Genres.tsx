import { AddOutlined, ChevronLeftOutlined } from '@mui/icons-material';
import { Box, Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import GenresFilter from '../components/GenresFilter';
import GenresList from '../components/GenresList';
import Meta from '../components/Meta';
import useAuth from '../hooks/useAuth';
import Heading from '../styles/styled/Heading';

export default function Genres() {
  const { isAdmin } = useAuth();
  return (
    <Box>
      <Container>
        <Meta pageTitle="Genres" />
        <Heading variant="h3" component="h1" my={4}>
          Genres
        </Heading>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link to="/">
                <Button startIcon={<ChevronLeftOutlined />}>
                  Back to main
                </Button>
              </Link>
              {isAdmin && (
                <Link to="/genres/new">
                  <Button startIcon={<AddOutlined />}>Add a new genre</Button>
                </Link>
              )}
            </Box>
          </Grid>
          <GenresFilter />
          <GenresList />
        </Grid>
      </Container>
    </Box>
  );
}
