import { Box, BoxProps, Fade, Grid, Typography } from '@mui/material';
import { cryingCatGif } from '../assets/img/urls';

type Props = {
  title: string;
  description: string;
} & BoxProps;

export default function ListEmpty({ title, description, ...boxProps }: Props) {
  return (
    <Grid item xs={12}>
      <Fade in={true}>
        <Box
          height={320}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          {...boxProps}
        >
          <img
            src={cryingCatGif}
            alt="A crying cat."
            height={120}
            style={{ borderRadius: '50%' }}
          />
          <Typography
            variant="h4"
            align="center"
            sx={{ mt: 2, fontWeight: 500, mb: 1 }}
          >
            {title}
          </Typography>
          <Typography variant="body1" align="center">
            {description}
          </Typography>
        </Box>
      </Fade>
    </Grid>
  );
}
