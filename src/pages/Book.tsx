import { CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetBookByIsbnQuery } from '../api/library';
import BookData from '../components/BookData';

export default function Book() {
  const { isbn } = useParams<{ isbn: string }>() as { isbn: string };
  const { data: getBookByIsbnResponse, isFetching } =
    useGetBookByIsbnQuery(isbn);

  return (
    <>
      {isFetching && <CircularProgress size={20} />}
      {getBookByIsbnResponse?.data && (
        <BookData book={getBookByIsbnResponse.data} />
      )}
    </>
  );
}
