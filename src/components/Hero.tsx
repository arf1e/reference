import { Grid, Typography } from '@mui/material';

export default function Hero() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        p: 4,
        my: 4,
        backgroundColor: 'rgba(10, 20, 200, 0.2)',
        border: '2px dashed blue',
      }}
    >
      <Grid item sm={6} xs={12}>
        <Typography variant="h2">Make all the bullshit make sense</Typography>
        <Typography variant="body2">
          There is a stupid, long-established habit in IT of coming up with
          complex terms to describe fairly simple ideas and concepts.
        </Typography>
        <Typography variant="body2">
          However, since the IT industry is growing constantly, understanding
          these concepts requires understanding the underlying concepts, which
          have prerequisites as well, and so on.
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          Our library curates books providing fundamental and specialized
          knowledge for developers.
        </Typography>
      </Grid>
      <Grid item sm={6} xs={12}>
        <Typography variant="h4">Decorative element</Typography>
      </Grid>
    </Grid>
  );
}
