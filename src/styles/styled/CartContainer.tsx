import { Box, styled } from '@mui/material';

export default styled(Box)`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  z-index: 3;
  background-color: ${({ theme }) => theme.palette.background.default};
`;
