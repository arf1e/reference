import { Box, Container, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'lightpink',
        padding: 2,
        border: '2px dashed red',
        minHeight: '15vh',
      }}
    >
      <Container>
        <Typography variant="body2" color="text.primary">
          Footer
        </Typography>
      </Container>
    </Box>
  );
}
