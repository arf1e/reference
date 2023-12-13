import { ButtonProps } from '@mui/base';
import { DeleteOutlined } from '@mui/icons-material';
import { useState } from 'react';
import handleAsyncOperation from '../utils/handleAsyncOperation';
import LoadingButton from './LoadingButton';

type Props = {
  action: () => Promise<unknown>;
  onSuccess: () => void;
  onError: (error: string) => void;
} & ButtonProps;

export default function DeleteButton({
  action,
  onSuccess,
  onError,
  ...buttonProps
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleSuccess = () => {
    setLoading(false);
    onSuccess();
  };

  const handleError = (error: string) => {
    setLoading(false);
    onError(error);
  };

  const handleClick = async () => {
    setLoading(true);
    await handleAsyncOperation(action, {
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };
  return (
    <LoadingButton
      {...buttonProps}
      loading={loading}
      startIcon={<DeleteOutlined />}
      onClick={handleClick}
      color="error"
    >
      {buttonProps.children}
    </LoadingButton>
  );
}
