import { Box, styled } from '@mui/material';
import composeBackgroundColor from '../../utils/composeBackgroundColor';

export default styled(Box)`
  position: absolute;
  top: '100%';
  width: '100%';
  left: 0;
  right: 0;
  z-index: 2;
  background-color: ${({ theme }) => composeBackgroundColor(theme, 2)};
`;
