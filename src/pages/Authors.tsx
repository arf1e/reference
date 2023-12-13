import { AddOutlined, ChevronLeftOutlined } from '@mui/icons-material';
import { Box, Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthorsFilter from '../components/AuthorsFilter';
import AuthorsList from '../components/AuthorsList';
import Meta from '../components/Meta';
import useAuth from '../hooks/useAuth';
import Heading from '../styles/styled/Heading';

export default function Authors() {
  const { isAdmin } = useAuth();
  return (
    <Box>
      <Container>
        <Meta pageTitle="Authors" />
        <Heading variant="h3" component="h1" my={4}>
          Authors
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
                <Link to="/authors/new">
                  <Button startIcon={<AddOutlined />}>New author</Button>
                </Link>
              )}
            </Box>
          </Grid>
          <AuthorsFilter />
          <AuthorsList />
        </Grid>
      </Container>
    </Box>
  );
}
