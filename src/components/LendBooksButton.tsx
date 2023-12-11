import { UpcomingOutlined } from '@mui/icons-material';
import pluralize from 'pluralize';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLendBooksMutation } from '../api/library';
import useAuth from '../hooks/useAuth';
import useToaster from '../hooks/useToaster';
import { RootState } from '../slices';
import { selectBooksInCart } from '../slices/cartSlice';
import { ApiResponse } from '../types/api';
import handleAsyncOperation from '../utils/handleAsyncOperation';
import LoadingButton from './LoadingButton';

type Props = {
  onLend: () => void;
};

const STATE_LOADING = 'LOADING';
const STATE_IDLE = 'IDLE';

type ButtonState = typeof STATE_LOADING | typeof STATE_IDLE;

export default function LendBooksButton({ onLend }: Props) {
  const [state, setState] = useState<ButtonState>(STATE_IDLE);
  const { user, jwt } = useAuth();
  const books = useSelector((state: RootState) =>
    selectBooksInCart(state.cart)
  );
  const [lendBooks] = useLendBooksMutation();
  const { showInfoMessage, showErrorMessage } = useToaster();

  if (!user || !jwt) {
    return null;
  }

  const onLendBooksSuccess = (
    result: ApiResponse<{ data: { borrowedBooks: string[] } }>
  ) => {
    setState(STATE_IDLE);
    const booksQty = result.data.data.borrowedBooks.length;
    showInfoMessage(`${booksQty} ${pluralize('book', booksQty)} borrowed`);
    onLend();
  };

  const onLendBooksError = (error: string) => {
    setState(STATE_IDLE);
    showErrorMessage(error);
  };

  const handleLendBooks = async () => {
    setState(STATE_LOADING);
    const bookIds = books.map((book) => book._id);
    await handleAsyncOperation(
      () => lendBooks({ userId: user._id, bookIds, accessToken: jwt }),
      {
        onSuccess: (
          result: ApiResponse<{ data: { borrowedBooks: string[] } }>
        ) => onLendBooksSuccess(result),
        onError: onLendBooksError,
      }
    );
  };

  return (
    <LoadingButton
      variant="contained"
      loading={state === STATE_LOADING}
      startIcon={<UpcomingOutlined />}
      onClick={handleLendBooks}
    >
      Lend {books.length} {pluralize('book', books.length)}
    </LoadingButton>
  );
}
