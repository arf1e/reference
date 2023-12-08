import { Box, styled } from '@mui/material';

export default styled(Box)`
  .input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
`;
