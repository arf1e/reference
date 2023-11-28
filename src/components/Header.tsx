import { Box, Container, Typography } from '@mui/material';

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        bgcolor: 'lightgreen',
        padding: 2,
        border: '2px dashed green',
        minHeight: '5vh',
      }}
    >
      <Container>
        <Typography variant="body2" color="text.primary">
          Header
        </Typography>
      </Container>
    </Box>
  );
}
