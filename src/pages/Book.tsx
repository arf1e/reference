import { Box, CircularProgress } from '@mui/material';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { useGetBookByIsbnQuery } from '../api/library';
import BookData from '../components/BookData';
import Meta from '../components/Meta';

export default function Book() {
  const { isbn } = useParams<{ isbn: string }>() as { isbn: string };
  const { data: getBookByIsbnResponse, isFetching } =
    useGetBookByIsbnQuery(isbn);

  return (
    <Box>
      <Meta
        pageTitle={_.get(getBookByIsbnResponse, ['data', 'title'], 'Book')}
      />
      {isFetching && <CircularProgress size={20} />}
      {getBookByIsbnResponse?.data && (
        <BookData book={getBookByIsbnResponse.data} />
      )}
    </Box>
  );
}
