import { Theme } from '@mui/material';

export default function composeBackgroundColor(
  theme: Theme,
  level: number = 0
) {
  const step = level * 100;
  return theme.palette.mode === 'dark'
    ? theme.palette.grey[
        (900 - step).toString() as keyof typeof theme.palette.grey
      ]
    : theme.palette.grey[
        (100 + step).toString() as keyof typeof theme.palette.grey
      ];
}
