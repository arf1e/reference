import { Box, Container, Grid, Typography } from '@mui/material';
import Heading from '../styles/styled/Heading';
import HeroDecoration from './HeroDecoration';

export default function Hero() {
  return (
    <Container>
      <Grid
        container
        spacing={2}
        sx={{
          my: 12,
        }}
      >
        <Grid item xs={12}>
          <HeroDecoration />
        </Grid>
        <Grid item xs={12} alignSelf="center" justifySelf="center" my={8}>
          <Container
            maxWidth="md"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Heading
              variant="h3"
              component="h1"
              sx={{ mb: 2, textAlign: 'center' }}
            >
              Make all the BS make sense.
            </Heading>
            <Container maxWidth="sm">
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="body1"
                  sx={{ lineHeight: '150%', maxWidth: '90%' }}
                >
                  In our library, we curate a cherry-picked list of books
                  providing fundamental and specialised knowledge for
                  developers.
                </Typography>
              </Box>
            </Container>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}
