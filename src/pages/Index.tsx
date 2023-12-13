import { Box } from '@mui/material';
import AuthorPreview from '../components/AuthorsPreview';
import Books from '../components/Books';
import Collections from '../components/Collections';
import Hero from '../components/Hero';
import Meta from '../components/Meta';
import Promo from '../components/Promo';

export default function Index() {
  return (
    <Box>
      <Meta />
      <Hero />
      <Promo />
      <Collections />
      <AuthorPreview />
      <Books />
    </Box>
  );
}
