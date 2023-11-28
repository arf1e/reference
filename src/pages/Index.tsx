import { Box } from '@mui/material';
import Books from '../components/Books';
import Collections from '../components/Collections';
import Hero from '../components/Hero';

export default function Index() {
  return (
    <Box>
      <Hero />
      <Collections />
      <Books />
    </Box>
  );
}
