import { Button, ButtonProps, CircularProgress } from '@mui/material';

type Props = {
  loading: boolean;
} & ButtonProps;

export default function LoadingButton({ loading, ...buttonProps }: Props) {
  const injectedProps = {
    ...buttonProps,
    ...(loading && {
      startIcon: (
        <CircularProgress size={24} color={buttonProps.color || 'primary'} />
      ),
      disabled: true,
    }),
  };
  return <Button {...injectedProps} />;
}
