import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useParams } from 'react-router-dom';
import { useGetBookByIsbnQuery } from '../api/library';

export default function Book() {
  const { isbn } = useParams<{ isbn: string }>() as { isbn: string };
  const { data: getBookByIsbnResponse } = useGetBookByIsbnQuery(isbn);

  return (
    <Box>
      <Typography variant="h5">Book</Typography>
      <Typography variant="body2">
        {JSON.stringify(getBookByIsbnResponse?.data)}
      </Typography>
    </Box>
  );
}
