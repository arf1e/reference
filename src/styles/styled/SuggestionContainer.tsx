import { Box, styled } from '@mui/material';
import composeBackgroundColor from '../../utils/composeBackgroundColor';

export default styled(Box)`
  border: none;
  box-shadow: none;
  background: ${({ theme }) => composeBackgroundColor(theme, 1)};
  color: ${({ theme }) => theme.palette.text.primary};
  padding: 8px 12px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  &:hover,
  &:focus {
    background: ${({ theme }) => composeBackgroundColor(theme, 2)};
  }
`;
