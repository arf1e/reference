import {
  AutoAwesomeOutlined,
  SurfingOutlined,
  WalletOutlined,
} from '@mui/icons-material';
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import PromoFeature from './PromoFeature';

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
          <PromoFeature
            icon=<AutoAwesomeOutlined
              fontSize="large"
              sx={{ color: theme.palette.primary.main }}
            />
            title="Books written for humans"
            description="And not just for their authors"
          />
          <PromoFeature
            icon=<SurfingOutlined
              fontSize="large"
              sx={{ color: theme.palette.primary.main }}
            />
            title="Your results oriented"
            description="Books that provide both theoretical and practical knowledge"
          />
          <PromoFeature
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
