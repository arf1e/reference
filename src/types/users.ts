import { BookType } from './books';

const ADMIN_ROLE = 'ADMIN';
const USER_ROLE = 'USER';

export type UserRole = typeof USER_ROLE | typeof ADMIN_ROLE;

export type UserType = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  role: UserRole;
  borrowedBooks: BookType[];
};
