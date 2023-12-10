import {
  PlaylistAddOutlined,
  PlaylistRemoveOutlined,
} from '@mui/icons-material';
import { Box, BoxProps, Button, ButtonOwnProps } from '@mui/material';
import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../slices';
import { addBook, removeBook, selectBookEntry } from '../slices/cartSlice';
import { BookType } from '../types/books';

type Props = {
  book: BookType;
  variant?: ButtonOwnProps['variant'];
} & BoxProps;

export default function LendListControls({
  book,
  variant = 'text',
  ...boxProps
}: Props) {
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
    <Box {...boxProps}>
      {isBookInList ? (
        <Button
          variant={variant}
          color="secondary"
          onClick={handleRemove}
          startIcon={<PlaylistRemoveOutlined />}
        >
          Remove from lend list
        </Button>
      ) : (
        <Button
          variant={variant}
          onClick={handleAdd}
          startIcon={<PlaylistAddOutlined />}
        >
          Add to lend list
        </Button>
      )}
    </Box>
  );
}
