import { CheckOutlined } from '@mui/icons-material';
import { Box, Button, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { BookType } from '../types/books';
import composeBackgroundColor from '../utils/composeBackgroundColor';

type Props = {
  book: BookType;
  returnAllowed: boolean;
  onReturn: () => unknown;
};

export default function BorrowedBookCard({
  book,
  returnAllowed,
  onReturn,
}: Props) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: composeBackgroundColor(theme, 1),
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        borderRadius: 2,
      }}
    >
      <img src={book.image} width="100%" alt={book.title} />
      <Typography mt={2} mb={1} variant="subtitle2">
        {book.title}
      </Typography>
      <Typography variant="caption">Return by</Typography>
      <Typography variant="subtitle2">
        {dayjs(book.returnDate).format('D MMM YYYY')}
      </Typography>
      {returnAllowed && (
        <Button
          color="primary"
          startIcon={<CheckOutlined />}
          onClick={onReturn}
        >
          Return
        </Button>
      )}
    </Box>
  );
}
