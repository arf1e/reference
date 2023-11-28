import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../components/RootLayout';
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
    ],
  },
]);

export default router;
