import dayjs from 'dayjs';
import _ from 'lodash';
import { BookType } from '../types/books';

export const convertBookToFormValues = (book: BookType) => {
  const output = {
    ..._.omit(book, ['_id']),
    authors: book.authors.map(({ _id }) => _id),
    genres: book.genres.map(({ _id }) => _id),
    publishedDate: dayjs(book.publishedDate).format('YYYY-MM-DD'),
    ...(book.borrowerId && {
      borrowDate: dayjs(book.borrowDate).format('YYYY-MM-DD'),
      returnDate: dayjs(book.returnDate).format('YYYY-MM-DD'),
    }),
    imageFile: null,
  };
  return output;
};
