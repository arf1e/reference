import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Toaster from './Toaster';

export default function RootLayout() {
  return (
    <Box>
      <Toaster />
      <Header />
      <Box sx={{ minHeight: '85vh' }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
