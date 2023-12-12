import { CloseOutlined } from '@mui/icons-material';
import { Box, Container, IconButton, Slide, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth';
import useCartOverlay from '../hooks/useCartOverlay';
import { RootState } from '../slices';
import { selectBooksInCart } from '../slices/cartSlice';
import CartContainer from '../styles/styled/CartContainer';
import Heading from '../styles/styled/Heading';
import CartNoAuth from './CartNoAuth';
import EmptyCart from './EmptyCart';
import LendList from './LendList';

const STATE_LOADING = 'LOADING';
const STATE_LIST = 'LIST';
const STATE_EMPTY = 'EMPTY';
const STATE_NO_AUTH = 'NO_AUTH';

type CartOverlayState =
  | typeof STATE_LOADING
  | typeof STATE_LIST
  | typeof STATE_EMPTY
  | typeof STATE_NO_AUTH;

export default function CartOverlay() {
  const { isShown, hideCartOverlay } = useCartOverlay();
  const theme = useTheme();
  const { isLoading, user } = useAuth();
  const [state, setState] = useState<CartOverlayState>(STATE_LOADING);
  const books = useSelector((state: RootState) =>
    selectBooksInCart(state.cart)
  );

  useEffect(() => {
    if (isLoading) {
      setState(STATE_LOADING);
      return;
    }

    if (!user) {
      setState(STATE_NO_AUTH);
      return;
    }

    if (books.length === 0) {
      setState(STATE_EMPTY);
      return;
    }

    setState(STATE_LIST);
  }, [isLoading, user, books.length]);

  return (
    <Slide direction="left" in={isShown} mountOnEnter unmountOnExit>
      <CartContainer>
        <Container>
          <Box sx={{ py: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={hideCartOverlay}>
              <CloseOutlined sx={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Box>
          <Heading variant="h3" component="h2">
            Books to lend
          </Heading>
          {state === STATE_LIST && <LendList books={books} />}
          {state === STATE_EMPTY && <EmptyCart />}
          {state === STATE_NO_AUTH && <CartNoAuth hideCart={hideCartOverlay} />}
        </Container>
      </CartContainer>
    </Slide>
  );
}
