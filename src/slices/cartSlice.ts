import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { BookType } from '../types/books';

export type CartState = {
  books: BookType[];
};

const initialState: CartState = {
  books: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<BookType>) => {
      state.books.push(action.payload);
    },
    removeBook: (state, action: PayloadAction<BookType>) => {
      state.books = _.remove(
        state.books,
        (book) => book._id !== action.payload._id
      );
    },
    clearCart: () => {
      return initialState;
    },
  },
});

export const selectBooksInCart = (state: CartState) => state.books;

export const selectBookEntry = (state: CartState, bookId: string) => {
  const bookFound = state.books.find((book) => book._id === bookId);
  return Boolean(bookFound);
};

export const { addBook, removeBook, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
