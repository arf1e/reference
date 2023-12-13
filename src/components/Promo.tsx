import {
  AutoAwesomeOutlined,
  SurfingOutlined,
  WalletOutlined,
} from '@mui/icons-material';
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import composeBackgroundColor from '../utils/composeBackgroundColor';

const Feature = ({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) => {
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
};

export default function Promo() {
  const theme = useTheme();
  return (
    <Container sx={{ my: 24 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: 24,
            letterSpacing: 4,
            opacity: 0.5,
          }}
          component="p"
        >
          This is Reference
          <Typography
            component="span"
            sx={{
              color: theme.palette.primary.main,
              fontSize: 'inherit',
              textAlign: 'center',
            }}
          >
            *
          </Typography>
        </Typography>
        <Typography variant="subtitle2" sx={{ fontSize: 48 }}>
          Nice to meet you!
        </Typography>
        <Grid container spacing={6} sx={{ mt: 4 }}>
          <Feature
            icon=<AutoAwesomeOutlined
              fontSize="large"
              sx={{ color: theme.palette.primary.main }}
            />
            title="Books written for humans"
            description="And not just for their authors"
          />
          <Feature
            icon=<SurfingOutlined
              fontSize="large"
              sx={{ color: theme.palette.primary.main }}
            />
            title="Your results oriented"
            description="Books that provide both theoretical and practical knowledge"
          />
          <Feature
            icon=<WalletOutlined
              fontSize="large"
              sx={{ color: theme.palette.primary.main }}
            />
            title="Free, forever"
            description="Or until we connect payments to this thing"
          />
        </Grid>
      </Box>
    </Container>
  );
}
