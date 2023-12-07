import { Box, Container } from '@mui/material';
import CartOverlay from './CartOverlay';
import LendListButton from './LendListButton';
import Logo from './Logo';
import ProfileButton from './ProfileButton';
import ThemeSwitch from './ThemeSwitch';

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        py: 4,
        minHeight: '5vh',
      }}
    >
      <CartOverlay />
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
              gap: 2,
            }}
          >
            <ThemeSwitch />
            <ProfileButton />
            <LendListButton />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
