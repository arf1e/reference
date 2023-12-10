import { Box } from '@mui/material';
import Books from '../components/Books';
import Hero from '../components/Hero';
import Meta from '../components/Meta';

export default function Index() {
  return (
    <Box>
      <Meta />
      <Hero />
      <Books />
    </Box>
  );
}
