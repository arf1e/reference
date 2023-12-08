import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
} from 'react';

export const STATUS_SUCCESS = 'success';
export const STATUS_INFO = 'info';
export const STATUS_ERROR = 'error';
export const STATUS_IDLE = 'idle';

export type STATUS_TYPES =
  | typeof STATUS_SUCCESS
  | typeof STATUS_INFO
  | typeof STATUS_ERROR
  | typeof STATUS_IDLE;

type NOTIFY_TYPES =
  | typeof STATUS_SUCCESS
  | typeof STATUS_INFO
  | typeof STATUS_ERROR;

const NOTIFICATION_TIMEOUT_MS = 5000;

export const ToasterContext = createContext<{
  status: STATUS_TYPES;
  setStatus: Dispatch<SetStateAction<STATUS_TYPES>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}>({
  status: STATUS_IDLE,
  setStatus: () => {},
  setMessage: () => {},
  message: '',
});

export type showToastArgumentsType = {
  status: NOTIFY_TYPES;
  message?: string;
};

/**
 * Custom hook for handling global notifications in form of toast messages.
 */
export default function useToaster() {
  const { status, setStatus, message, setMessage } = useContext(ToasterContext);

  const showSuccessMessage = useCallback(
    (message: string = 'Success!') => {
      setMessage(message);
      setStatus(STATUS_SUCCESS);
    },
    [setMessage, setStatus]
  );

  const showErrorMessage = useCallback(
    (message: string = 'Error!') => {
      setMessage(message);
      setStatus(STATUS_ERROR);
    },
    [setMessage, setStatus]
  );

  const showInfoMessage = useCallback(
    (message: string = 'Info') => {
      setMessage(message);
      setStatus(STATUS_INFO);
    },
    [setMessage, setStatus]
  );

  const hideToaster = useCallback(() => {
    setStatus(STATUS_IDLE);
    setMessage('');
  }, [setMessage, setStatus]);

  useEffect(() => {
    if (status !== STATUS_IDLE) {
      const timeout = setTimeout(() => {
        hideToaster();
      }, NOTIFICATION_TIMEOUT_MS);
      return () => clearTimeout(timeout);
    }
  });

  const notify = useCallback(
    ({ status, message }: showToastArgumentsType) => {
      const statusMapper = {
        [STATUS_SUCCESS]: showSuccessMessage,
        [STATUS_ERROR]: showErrorMessage,
        [STATUS_INFO]: showInfoMessage,
      };

      const notifyFn = statusMapper[status];
      notifyFn(message);
    },
    [showSuccessMessage, showInfoMessage, showErrorMessage]
  );

  return {
    status,
    message,
    notify,
    showInfoMessage,
    showSuccessMessage,
    showErrorMessage,
    hideToaster,
  };
}
