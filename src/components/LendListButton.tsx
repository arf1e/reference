import { ListOutlined } from '@mui/icons-material';
import { Badge, IconButton, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import useCartOverlay from '../hooks/useCartOverlay';
import { RootState } from '../slices';
import { selectBooksInCart } from '../slices/cartSlice';

export default function LendListButton() {
  const theme = useTheme();
  const { showCartOverlay } = useCartOverlay();
  const books = useSelector((state: RootState) =>
    selectBooksInCart(state.cart)
  );

  return (
    <IconButton onClick={showCartOverlay}>
      <Badge badgeContent={books.length} color="primary">
        <ListOutlined sx={{ color: theme.palette.primary.main }} />
      </Badge>
    </IconButton>
  );
}
