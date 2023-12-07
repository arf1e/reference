import { Box, Button, Typography, Zoom } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Props = {
  hideCart: () => void;
};
export default function CartNoAuth({ hideCart }: Props) {
  const navigate = useNavigate();

  const onProceedToLogin = () => {
    hideCart();
    navigate('/auth');
  };
  return (
    <Zoom in={true}>
      <Box
        sx={{
          mt: 12,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h3" component="h2">
          May we see some ID?
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          You need to be logged in to lend books.
        </Typography>
        <Button onClick={onProceedToLogin}>Login</Button>
      </Box>
    </Zoom>
  );
}
