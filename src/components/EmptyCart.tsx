import { Box, Typography, Zoom } from '@mui/material';

export default function EmptyCart() {
  return (
    <Zoom in={true}>
      <Box
        sx={{
          mt: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" component="h2">
          🤔 No books to lend
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Feel free to browse our collection and add some books to your lend
          list.
        </Typography>
      </Box>
    </Zoom>
  );
}
