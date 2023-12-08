import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import CartOverlayContextProvider from './components/CartOverlayContextProvider';
import { ToasterContextProvider } from './components/Toaster';
import router from './config/router';
import composeTheme from './config/theme';
import useColorMode from './hooks/useColorMode';

function App() {
  const { colorMode } = useColorMode();
  const theme = useMemo(() => composeTheme(colorMode), [colorMode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToasterContextProvider>
        <CartOverlayContextProvider>
          <RouterProvider router={router} />
        </CartOverlayContextProvider>
      </ToasterContextProvider>
    </ThemeProvider>
  );
}

export default App;
