import { createTheme } from '@mui/material';
import { ColorModeType } from '../hooks/useColorMode';

const composeTheme = (mode: ColorModeType) =>
  createTheme({
    palette: {
      mode,
    },
  });

export default composeTheme;
