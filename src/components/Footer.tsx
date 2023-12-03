import { Box, Container, useTheme } from '@mui/material';
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
        <Logo />
      </Container>
    </Box>
  );
}
