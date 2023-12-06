import { Box, styled } from '@mui/material';
import {
  FORM_ERROR,
  FORM_IDLE,
  FORM_LOADING,
  FORM_SUCCESS,
  UseFormStateType,
} from '../../hooks/useStatusBar';
import composeBackgroundColor from '../../utils/composeBackgroundColor';

export default styled(Box)<{ state: UseFormStateType }>`
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 2em;
  border-top-right-radius: 2em;
  transition: 0.2s;
  height: ${({ state }) => (state === FORM_IDLE ? '0' : '2em')};
  opacity: ${({ state }) => (state === FORM_IDLE ? '0' : '1')};
  background-color: ${({ theme, state }) => {
    const color = {
      [FORM_IDLE]: 'transparent',
      [FORM_LOADING]: composeBackgroundColor(theme, 2),
      [FORM_SUCCESS]: theme.palette.success.dark,
      [FORM_ERROR]: theme.palette.error.dark,
    }[state];
    return color;
  }};
`;
