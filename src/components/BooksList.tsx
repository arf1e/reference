import { Box, Typography } from '@mui/material';

export default function BooksList() {
  return (
    <Box
      sx={{
        backgroundColor: 'lightgreen',
        border: '2px dashed green',
        minHeight: '24em',
      }}
    >
      <Typography variant="h5">Books List</Typography>
    </Box>
  );
}
