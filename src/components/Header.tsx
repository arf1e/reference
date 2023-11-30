import { Box, Container } from '@mui/material';
import Logo from './Logo';

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        py: 4,
        minHeight: '5vh',
      }}
    >
      <Container>
        <Logo />
      </Container>
    </Box>
  );
}
