import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../components/RootLayout';
import Book from '../pages/Book';
import Index from '../pages/Index';

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
    ],
  },
]);

export default router;
