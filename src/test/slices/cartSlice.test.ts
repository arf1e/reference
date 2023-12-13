import cartReducer, {
  addBook,
  removeBook,
  clearCart,
  selectBookEntry,
  selectBooksInCart,
} from '../../slices/cartSlice';
import { booksFixture } from '../__fixtures__/books';

describe('actions', () => {
  it('adds books to cart', () => {
    const state = {
      books: [],
    };
    const payload = booksFixture.data.books[0];
    const action = addBook(payload);
    const result = cartReducer(state, action);
    expect(result.books).toHaveLength(1);
  });

  it('removes books from cart', () => {
    const state = {
      books: [booksFixture.data.books[0], booksFixture.data.books[1]],
    };
    const payload = booksFixture.data.books[0];
    const action = removeBook(payload);
    const result = cartReducer(state, action);
    expect(selectBooksInCart(result)).toHaveLength(1);
    expect(selectBookEntry(result, booksFixture.data.books[1]._id)).toBe(true);
  });

  it('does not remove books from cart if book is not in cart', () => {
    const state = {
      books: [booksFixture.data.books[0]],
    };
    const payload = booksFixture.data.books[1];
    const action = removeBook(payload);
    const result = cartReducer(state, action);
    expect(selectBooksInCart(result)).toHaveLength(1);
    expect(selectBookEntry(result, booksFixture.data.books[1]._id)).toBe(false);
  });

  it('clears cart', () => {
    const state = {
      books: [booksFixture.data.books[0], booksFixture.data.books[1]],
    };
    const action = clearCart();
    const result = cartReducer(state, action);
    expect(result.books).toHaveLength(0);
  });
});
