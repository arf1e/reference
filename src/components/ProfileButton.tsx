import { LoginOutlined } from '@mui/icons-material';
import { IconButton, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ProfileButton() {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <IconButton onClick={() => navigate('/auth')}>
      <LoginOutlined sx={{ color: theme.palette.primary.main }} />
    </IconButton>
  );
}
