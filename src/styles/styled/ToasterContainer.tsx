import { styled } from '@mui/material';
import { Box } from '@mui/system';
import {
  STATUS_ERROR,
  STATUS_IDLE,
  STATUS_INFO,
  STATUS_SUCCESS,
  STATUS_TYPES,
} from '../../hooks/useToaster';

const ToasterContainer = styled(Box)<{ shown: number; status: STATUS_TYPES }>`
  position: fixed;
  bottom: ${({ shown }) => (shown === 1 ? 0 : '-5%')};
  transition: 0.3s ease-in-out;
  opacity: ${({ shown }) => (shown === 1 ? 1 : 0)};
  padding: 1em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  z-index: 4;
  background-color: ${({ theme, status }) => {
    const darkMode = theme.palette.mode === 'dark';
    const color = {
      [STATUS_IDLE]: 'transparent',
      [STATUS_SUCCESS]: darkMode
        ? theme.palette.success.dark
        : theme.palette.success.main,
      [STATUS_ERROR]: darkMode
        ? theme.palette.error.dark
        : theme.palette.error.main,
      [STATUS_INFO]: darkMode
        ? theme.palette.info.dark
        : theme.palette.info.main,
    }[status];
    return color;
  }};
`;

export default ToasterContainer;
