import { createBrowserRouter } from 'react-router-dom';
import AuthGate from '../components/AuthGate';
import RootLayout from '../components/RootLayout';
import Auth from '../pages/Auth';
import Book from '../pages/Book';
import Index from '../pages/Index';
import Playground from '../pages/Playground';
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
      {
        path: 'pg',
        element: <Playground />,
      },
    ],
  },
]);

export default router;
