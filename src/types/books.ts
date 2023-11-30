export type GenreType = {
  _id: string;
  title: string;
};

export type StatusType = 'available' | 'borrowed';

export type AuthorType = {
  _id: string;
  name: string;
  bio: string;
  image: string;
};

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
