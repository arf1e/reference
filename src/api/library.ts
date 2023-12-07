import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/api';
import { ApiResponse, PaginationInput, WithPagination } from '../types/api';
import { JwtResponse, LoginInput, SignupInput } from '../types/auth';
import { BookFilters, BookType } from '../types/books';
import { UserType } from '../types/users';

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
        url: '/books',
        params: filters,
      }),
    }),
    getBookByIsbn: builder.query<ApiResponse<BookType>, string>({
      query: (isbn) => ({
        url: `/books/${isbn}`,
      }),
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
      query: (accessToken: string) => ({
        url: '/auth/me',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
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
} = libraryApi;
