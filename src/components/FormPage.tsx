import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode } from 'react';
import Heading from '../styles/styled/Heading';
import Meta from './Meta';

type Props = {
  title: string;
  pageTitle?: string;
  children: ReactNode | ReactNode[];
};

export default function FormPage({ title, pageTitle, children }: Props) {
  return (
    <Box>
      <Container>
        <Meta pageTitle={pageTitle || title} />
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12} md={10} lg={8} sx={{ my: 8 }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
              <Heading variant="h3" component="h1" alignSelf="center">
                {title}
              </Heading>
            </Box>
            {children}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
