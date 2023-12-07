import { Box, Button } from '@mui/material';
import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../slices';
import { addBook, removeBook, selectBookEntry } from '../slices/cartSlice';
import { BookType } from '../types/books';

type Props = {
  book: BookType;
};

export default function LendListControls({ book }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const isBookInList = useSelector((state: RootState) =>
    selectBookEntry(state.cart, book._id)
  );

  const handleAdd = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addBook(book));
  };

  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(removeBook(book));
  };

  if (book.status !== 'available') {
    return null;
  }

  return (
    <Box sx={{ mt: 2 }}>
      {isBookInList ? (
        <Button variant="text" color="error" onClick={handleRemove}>
          Remove from list
        </Button>
      ) : (
        <Button variant="text" onClick={handleAdd}>
          Add to list
        </Button>
      )}
    </Box>
  );
}
