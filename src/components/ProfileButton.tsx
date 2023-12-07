import { LoginOutlined, PersonOutlined } from '@mui/icons-material';
import { CircularProgress, IconButton, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function ProfileButton() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isLoading, user } = useAuth();
  return (
    <>
      {isLoading && <CircularProgress size="small" />}
      {user && (
        <IconButton onClick={() => navigate('/me')}>
          <PersonOutlined sx={{ color: theme.palette.primary.main }} />
        </IconButton>
      )}
      {!user && (
        <IconButton onClick={() => navigate('/auth')}>
          <LoginOutlined sx={{ color: theme.palette.primary.main }} />
        </IconButton>
      )}
    </>
  );
}
