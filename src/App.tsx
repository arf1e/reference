import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './config/router';
import composeTheme from './config/theme';
import useColorMode from './hooks/useColorMode';

function App() {
  const { colorMode } = useColorMode();
  const theme = useMemo(() => composeTheme(colorMode), [colorMode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
