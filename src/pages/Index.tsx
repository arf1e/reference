import { Box } from '@mui/material';
import Books from '../components/Books';
import Collections from '../components/Collections';
import Hero from '../components/Hero';
import Meta from '../components/Meta';

export default function Index() {
  return (
    <Box>
      <Meta />
      <Hero />
      <Collections />
      <Books />
    </Box>
  );
}
