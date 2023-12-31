import { AuthorType } from './authors';
import { GenreType } from './genres';

export type StatusType = 'available' | 'borrowed';

export type BookType = {
  _id: string;
  title: string;
  isbn: string;
  publisher: string;
  image: string;
  authors: AuthorType[];
  genres: GenreType[];
  status: StatusType;
  publishedDate: string;
  borrowerId?: string;
  borrowDate?: string;
  returnDate?: string;
};

export type BookDto = {
  title: string;
  isbn: string;
  publisher: string;
  image: string;
  authors: string[];
  genres: string[];
  publishedDate: string;
};

export interface BookFilters {
  title: string;
  author: string;
  genre: string;
  status: 'available' | 'borrowed' | '';
}
