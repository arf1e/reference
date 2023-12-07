import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import CartOverlayContextProvider from './components/CartOverlayContextProvider';
import router from './config/router';
import composeTheme from './config/theme';
import useColorMode from './hooks/useColorMode';

function App() {
  const { colorMode } = useColorMode();
  const theme = useMemo(() => composeTheme(colorMode), [colorMode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartOverlayContextProvider>
        <RouterProvider router={router} />
      </CartOverlayContextProvider>
    </ThemeProvider>
  );
}

export default App;
