import { createBrowserRouter } from 'react-router-dom';
import AuthGate from '../components/AuthGate';
import RootLayout from '../components/RootLayout';
import Auth from '../pages/Auth';
import Book from '../pages/Book';
import CreateBook from '../pages/CreateBook';
import EditBook from '../pages/EditBook';
import Index from '../pages/Index';
import Profile from '../pages/Profile';

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
        path: 'books/create',
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
            <Profile />
          </AuthGate>
        ),
      },
    ],
  },
]);

export default router;
