import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/api';
import { ApiResponse, PaginationInput, WithPagination } from '../types/api';
import { LoginInput, SignupInput } from '../types/auth';
import { BookFilters, BookType } from '../types/books';

export const libraryApi = createApi({
  reducerPath: 'libraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Book', 'Author', 'Genre'],
  endpoints: (builder) => ({
    getAllBooks: builder.query<
      ApiResponse<WithPagination<{ books: BookType[] }>>,
      BookFilters & PaginationInput
    >({
      query: (filters) => ({
        url: '/books?limit=1',
        params: filters,
      }),
    }),
    getBookByIsbn: builder.query<ApiResponse<BookType>, string>({
      query: (isbn) => ({
        url: `/books/${isbn}`,
      }),
    }),
    login: builder.mutation<unknown, LoginInput>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation<unknown, SignupInput>({
      query: (credentials) => ({
        url: '/auth/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIsbnQuery,
  useLoginMutation,
  useSignupMutation,
} = libraryApi;
