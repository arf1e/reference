import { Box } from '@mui/material';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { useGetBookByIsbnQuery } from '../api/library';
import BookData from '../components/BookData';
import EntityLoading from '../components/EntityLoading';
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
      {isFetching && <EntityLoading />}
      {getBookByIsbnResponse?.data && (
        <BookData book={getBookByIsbnResponse.data} />
      )}
    </Box>
  );
}
