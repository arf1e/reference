import { styled, Typography, TypographyProps } from '@mui/material';

export default styled(Typography)<TypographyProps>`
  font-weight: bold;
  display: inline-block;
  background: ${({ theme }) =>
    theme.palette.getContrastText(theme.palette.primary.contrastText)};
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;
