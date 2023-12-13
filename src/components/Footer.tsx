import { Box, Container, Typography, useTheme } from '@mui/material';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import Logo from './Logo';

export default function Footer() {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        minHeight: '10vh',
        backgroundColor: composeBackgroundColor(theme, 1),
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Logo />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <Typography variant="caption">We're not a real company.</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
