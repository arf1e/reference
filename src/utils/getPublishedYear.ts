import dayjs from 'dayjs';
import { BookType } from '../types/books';

export default function getPublishedYear(
  publishedDate: BookType['publishedDate']
) {
  return dayjs(publishedDate).year();
}
