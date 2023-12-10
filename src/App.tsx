import { CssBaseline, ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToasterContextProvider>
          <CartOverlayContextProvider>
            <RouterProvider router={router} />
          </CartOverlayContextProvider>
        </ToasterContextProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
