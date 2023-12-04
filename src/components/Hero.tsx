import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Heading from '../styles/styled/Heading';
import HeroDecoration from './HeroDecoration';

export default function Hero() {
  const navigate = useNavigate();
  return (
    <Container>
      <Grid
        container
        spacing={2}
        sx={{
          my: 4,
          py: 8,
        }}
      >
        <Grid item sm={6} xs={12}>
          <Heading variant="h4" component="h1" sx={{ mb: 2 }}>
            Make all the BS make sense.
          </Heading>
          <Box sx={{ maxWidth: '80%' }}>
            <Typography variant="body2" sx={{ mb: 1, lineHeight: '140%' }}>
              There is a stupid, long-established habit in IT of coming up with
              complex terms to describe fairly simple ideas and concepts.
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, lineHeight: '140%' }}>
              However, since the IT industry is growing constantly,
              understanding these concepts requires understanding the underlying
              concepts, which have prerequisites as well, and so on.
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 'bold', lineHeight: '140%' }}
            >
              Our library curates books providing fundamental and specialized
              knowledge for developers.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="text"
                disableElevation
                color="primary"
                onClick={() => navigate('/auth')}
              >
                Sign up for free
              </Button>
              <Button variant="text" color="secondary" sx={{ ml: 2 }}>
                Browse books
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={6} xs={12}>
          <HeroDecoration />
        </Grid>
      </Grid>
    </Container>
  );
}
