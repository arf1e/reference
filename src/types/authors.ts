export type AuthorType = {
  _id: string;
  name: string;
  bio: string;
  image: string;
  booksCount: number;
};

export type AuthorDto = {
  name: string;
  bio: string;
  image: string;
};

export type AuthorFilters = {
  name: string;
};
