import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/api';
import { ApiResponse, PaginationInput, WithPagination } from '../types/api';
import {
  JwtResponse,
  LoginInput,
  SignupInput,
  UpdatePasswordInput,
} from '../types/auth';
import { AuthorType } from '../types/authors';
import { BookDto, BookFilters, BookType } from '../types/books';
import { GenreType } from '../types/genres';
import { ProfileUpdateDto, UserType } from '../types/users';

export const libraryApi = createApi({
  reducerPath: 'libraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Book', 'Author', 'Genre', 'User'],
  endpoints: (builder) => ({
    getAllBooks: builder.query<
      ApiResponse<WithPagination<{ books: BookType[] }>>,
      BookFilters & PaginationInput
    >({
      query: (filters) => ({
        url: '/books',
        params: filters,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.books.map(({ _id }) => ({
                type: 'Book' as const,
                id: _id,
              })),
            ]
          : ['Book'],
    }),
    getBookByIsbn: builder.query<ApiResponse<BookType>, string>({
      query: (isbn) => ({
        url: `/books/${isbn}`,
      }),
      providesTags: (result) =>
        result ? [{ type: 'Book', id: result.data._id }] : [],
    }),
    getAuthorById: builder.query<ApiResponse<AuthorType>, string>({
      query: (id) => ({
        url: `/authors/${id}`,
      }),
      providesTags: (result) =>
        result ? [{ type: 'Author', id: result.data._id }] : [],
    }),
    getGenreById: builder.query<ApiResponse<GenreType>, string>({
      query: (id) => ({
        url: `/genres/${id}`,
      }),
      providesTags: (result) =>
        result ? [{ type: 'Genre', id: result.data._id }] : [],
    }),
    login: builder.mutation<ApiResponse<JwtResponse>, LoginInput>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation<ApiResponse<JwtResponse>, SignupInput>({
      query: (credentials) => ({
        url: '/auth/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
    getMyProfile: builder.query<ApiResponse<UserType>, string>({
      query: (accessToken) => ({
        url: '/auth/me',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: (result) =>
        result ? [{ type: 'User', id: result.data._id }] : [],
    }),
    getUserById: builder.query<
      ApiResponse<UserType>,
      { accessToken: string; id: string }
    >({
      query: ({ accessToken, id }) => ({
        url: `/users/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: (result) =>
        result ? [{ type: 'User', id: result.data._id }] : [],
    }),
    updateUserById: builder.mutation<
      ApiResponse<UserType>,
      { accessToken: string; id: string; body: ProfileUpdateDto }
    >({
      query: ({ accessToken, id, body }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: 'User', id: result.data._id }] : [],
    }),
    updatePassword: builder.mutation<
      ApiResponse<null>,
      UpdatePasswordInput & { accessToken: string }
    >({
      query: ({ accessToken, ...body }) => ({
        url: '/auth/password',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body,
      }),
    }),
    lendBooks: builder.mutation<
      ApiResponse<{ borrowedBooks: string[] }>,
      { userId: string; bookIds: string[]; accessToken: string }
    >({
      query: ({ userId, bookIds, accessToken }) => ({
        url: `/users/${userId}/borrow`,
        method: 'POST',
        body: bookIds,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: (result, _error, { userId }) =>
        result
          ? [
              ...result.data.borrowedBooks.map((bookId) => ({
                type: 'Book' as const,
                id: bookId,
              })),
              { type: 'User', id: userId },
            ]
          : [],
    }),
    returnBooks: builder.mutation<
      ApiResponse<{ returnedBooks: string[] }>,
      { userId: string; bookIds: string[]; accessToken: string }
    >({
      query: ({ userId, bookIds, accessToken }) => ({
        url: `/users/${userId}/return`,
        method: 'POST',
        body: bookIds,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: (result, _error, { userId }) =>
        result
          ? [
              ...result.data.returnedBooks.map((bookId) => ({
                type: 'Book' as const,
                id: bookId,
              })),
              { type: 'User', id: userId },
            ]
          : [],
    }),
    createBook: builder.mutation<
      ApiResponse<BookType>,
      { accessToken: string; book: BookDto }
    >({
      query: ({ accessToken, book }) => ({
        url: '/books',
        method: 'POST',
        body: book,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    updateBook: builder.mutation<
      ApiResponse<BookType>,
      { accessToken: string; book: BookDto; isbn: string }
    >({
      query: ({ accessToken, book, isbn }) => ({
        url: `/books/${isbn}`,
        method: 'PUT',
        body: book,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: (result, _error) =>
        result ? [{ type: 'Book', id: result.data._id }] : [],
    }),
    deleteBook: builder.mutation<
      void,
      { accessToken: string; isbn: string; id: string }
    >({
      query: ({ accessToken, isbn }) => ({
        url: `/books/${isbn}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: (_result, error, args) =>
        error ? [] : [{ type: 'Book', id: args.id }],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIsbnQuery,
  useLoginMutation,
  useSignupMutation,
  useGetMyProfileQuery,
  useLazyGetMyProfileQuery,
  useLendBooksMutation,
  useReturnBooksMutation,
  useCreateBookMutation,
  useUpdateBookMutation,
  useGetAuthorByIdQuery,
  useGetGenreByIdQuery,
  useDeleteBookMutation,
  useUpdatePasswordMutation,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
} = libraryApi;
