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
          </Box>
        </Grid>
        <Grid item sm={6} xs={12}>
          <HeroDecoration />
        </Grid>
      </Grid>
    </Container>
  );
}
