import { createBrowserRouter } from 'react-router-dom';
import AuthGate from '../components/AuthGate';
import RootLayout from '../components/RootLayout';
import Auth from '../pages/Auth';
import Author from '../pages/Author';
import Authors from '../pages/Authors';
import Book from '../pages/Book';
import CreateAuthor from '../pages/CreateAuthor';
import CreateBook from '../pages/CreateBook';
import CreateGenre from '../pages/CreateGenre';
import EditAuthor from '../pages/EditAuthor';
import EditBook from '../pages/EditBook';
import EditGenre from '../pages/EditGenre';
import EditProfile from '../pages/EditProfile';
import Genre from '../pages/Genre';
import Genres from '../pages/Genres';
import Index from '../pages/Index';
import Me from '../pages/Me';
import UpdatePassword from '../pages/UpdatePassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <Index />,
      },
      {
        path: 'books/:isbn',
        element: <Book />,
      },
      {
        path: 'books/:isbn/edit',
        element: (
          <AuthGate
            needsAdminRights
            accessDeniedMessage="You need to be an admin to edit a book"
          >
            <EditBook />
          </AuthGate>
        ),
      },
      {
        path: 'books/new',
        element: (
          <AuthGate
            needsAdminRights
            accessDeniedMessage="You need to be an admin to create a book"
          >
            <CreateBook />
          </AuthGate>
        ),
      },
      {
        path: 'auth',
        element: <Auth />,
      },
      {
        path: 'me',
        element: (
          <AuthGate>
            <Me />
          </AuthGate>
        ),
      },
      {
        path: 'users/:id/edit',
        element: (
          <AuthGate accessDeniedMessage="You have to log in first.">
            <EditProfile />
          </AuthGate>
        ),
      },
      {
        path: 'update-password',
        element: (
          <AuthGate>
            <UpdatePassword />
          </AuthGate>
        ),
      },
      {
        path: 'genres',
        element: <Genres />,
      },
      {
        path: 'genres/:id',
        element: <Genre />,
      },
      {
        path: 'genres/:id/edit',
        element: (
          <AuthGate
            needsAdminRights
            accessDeniedMessage="You need to be an admin to edit a genre"
          >
            <EditGenre />
          </AuthGate>
        ),
      },
      {
        path: 'genres/new',
        element: (
          <AuthGate
            needsAdminRights
            accessDeniedMessage="You need to be an admin to create a genre"
          >
            <CreateGenre />
          </AuthGate>
        ),
      },
      {
        path: 'authors',
        element: <Authors />,
      },
      {
        path: 'authors/:id',
        element: <Author />,
      },
      {
        path: 'authors/:id/edit',
        element: (
          <AuthGate
            needsAdminRights
            accessDeniedMessage="You need to be an admin to edit an author"
          >
            <EditAuthor />
          </AuthGate>
        ),
      },
      {
        path: 'authors/new',
        element: (
          <AuthGate
            needsAdminRights
            accessDeniedMessage="You need to be an admin to create an author"
          >
            <CreateAuthor />
          </AuthGate>
        ),
      },
    ],
  },
]);

export default router;
