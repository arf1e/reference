import { UpcomingOutlined } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';
import pluralize from 'pluralize';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLendBooksMutation } from '../api/library';
import useAuth from '../hooks/useAuth';
import { RootState } from '../slices';
import { selectBooksInCart } from '../slices/cartSlice';
import handleAsyncOperation from '../utils/handleAsyncOperation';

type Props = {
  onLend: () => void;
};

const STATE_LOADING = 'LOADING';
const STATE_IDLE = 'IDLE';
const STATE_NO_AUTH = 'NO_AUTH';

type ButtonState =
  | typeof STATE_LOADING
  | typeof STATE_IDLE
  | typeof STATE_NO_AUTH;

export default function LendBooksButton({ onLend }: Props) {
  const [state, setState] = useState<ButtonState>(STATE_LOADING);
  const { isLoading: isAuthLoading, user, jwt } = useAuth();
  const books = useSelector((state: RootState) =>
    selectBooksInCart(state.cart)
  );
  const [lendBooks] = useLendBooksMutation();

  useEffect(() => {
    if (isAuthLoading) {
      setState(STATE_LOADING);
      return;
    }

    if (!user || !jwt) {
      setState(STATE_NO_AUTH);
      return;
    }

    setState(STATE_IDLE);
  });

  const startIcon = useMemo(
    () =>
      state === STATE_LOADING ? (
        <CircularProgress size={24} color="primary" />
      ) : (
        <UpcomingOutlined />
      ),
    [state]
  );

  if (!jwt || !user) {
    return null;
  }

  const onLendBooksSuccess = () => {
    setState(STATE_IDLE);
    onLend();
  };

  const onLendBooksError = (error: string) => {
    setState(STATE_IDLE);
    console.error(error);
  };

  const handleLendBooks = async () => {
    const bookIds = books.map((book) => book._id);
    await handleAsyncOperation(
      () => lendBooks({ userId: user._id, bookIds, accessToken: jwt }),
      { onSuccess: onLendBooksSuccess, onError: onLendBooksError }
    );
  };


  return (
    <Button
      variant="contained"
      disabled={state === STATE_LOADING}
      startIcon={startIcon}
      onClick={handleLendBooks}
    >
      Lend {books.length} {pluralize('book', books.length)}
    </Button>
  );
}
