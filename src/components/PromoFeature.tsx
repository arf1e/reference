import { Box, Grid, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import composeBackgroundColor from '../utils/composeBackgroundColor';

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function PromoFeature({ icon, title, description }: Props) {
  const theme = useTheme();
  return (
    <Grid item xs={6} md={4}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            width: 80,
            height: 80,
            backgroundColor: composeBackgroundColor(theme, 0),
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {description}
        </Typography>
      </Box>
    </Grid>
  );
}
