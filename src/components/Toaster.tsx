import { Typography } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import useToaster, {
  STATUS_IDLE,
  STATUS_TYPES,
  ToasterContext,
} from '../hooks/useToaster';
import ToasterContainer from '../styles/styled/ToasterContainer';

export const ToasterContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [status, setStatus] = useState<STATUS_TYPES>(STATUS_IDLE);
  const [message, setMessage] = useState<string>('');

  return (
    <ToasterContext.Provider value={{ status, setStatus, message, setMessage }}>
      {children}
    </ToasterContext.Provider>
  );
};

export default function Toaster() {
  const { message, status, hideToaster } = useToaster();
  const [shown, setShown] = useState<boolean>(false);

  useEffect(() => {
    if (status !== STATUS_IDLE) {
      setShown(true);
      return;
    }
    setShown(false);
  }, [status]);

  return (
    <ToasterContainer
      shown={shown ? 1 : 0}
      status={status}
      onClick={hideToaster}
    >
      <Typography variant="body1" color="white" sx={{ fontWeight: 500 }}>
        {message}
      </Typography>
    </ToasterContainer>
  );
}
