import { Box, Container, Typography } from '@mui/material';

export default function Collections() {
  return (
    <Box
      sx={{
        my: 4,
        p: 4,
        backgroundColor: 'lightskyblue',
        border: '2px dashed blue',
      }}
    >
      <Container>
        <Box>
          <Typography variant="h4">Collections</Typography>
        </Box>
      </Container>
    </Box>
  );
}
