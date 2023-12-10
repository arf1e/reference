import { Theme } from '@mui/material';
import composeBackgroundColor from './composeBackgroundColor';

export default function composeHoverBackgroundColor(
  theme: Theme,
  defaultLevel: number
) {
  const { mode } = theme.palette;
  const level = mode === 'light' ? defaultLevel + 1 : defaultLevel - 1;
  return composeBackgroundColor(theme, level);
}
