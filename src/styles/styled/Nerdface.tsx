import { styled } from '@mui/material';
import { Box } from '@mui/system';
import nerdface from '../../assets/img/nerdface.png';

export default styled(Box)`
  @keyframes float {
    0% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(-8px);
    }

    100% {
      transform: translateY(0px);
    }
  }

  width: 170px;
  height: 170px;
  background: url(${nerdface}) no-repeat center;
  background-size: contain;
  align-self: center;
  animation: float 3s ease-in-out infinite;
`;
