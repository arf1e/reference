import dayjs from 'dayjs';
import { BookType } from '../types/books';

export default (publishedDate: BookType['publishedDate']) =>
  dayjs(publishedDate).year();
