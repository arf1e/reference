import { ClearOutlined, UpcomingOutlined } from '@mui/icons-material';
import { Box, Button, Collapse, Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import useCartOverlay from '../hooks/useCartOverlay';
import { AppDispatch } from '../slices';
import { clearCart } from '../slices/cartSlice';
import { BookType } from '../types/books';
import LendBooksButton from './LendBooksButton';
import LendItem from './LendItem';

type Props = {
  books: BookType[];
};

export default function LendList({ books }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const clearList = () => dispatch(clearCart());
  const { hideCartOverlay } = useCartOverlay();

  const onLend = () => {
    clearList();
    hideCartOverlay();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
      <TransitionGroup>
        {books.map((book) => (
          <Collapse key={book._id}>
            <LendItem book={book} key={book._id} />
          </Collapse>
        ))}
      </TransitionGroup>
      <Divider sx={{ width: '100%' }} role="presentation" />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <LendBooksButton onLend={onLend} />
        <Button
          color="error"
          sx={{ ml: 2 }}
          startIcon={<ClearOutlined />}
          onClick={clearList}
        >
          Clear list
        </Button>
      </Box>
    </Box>
  );
}
