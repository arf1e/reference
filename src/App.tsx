import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { RouterProvider } from 'react-router-dom';
import router from './config/router';

function App() {
  const theme = createTheme({ palette: { mode: 'light' } });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
