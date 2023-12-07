import { EditOutlined, LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import useOwnership from '../hooks/useOwnership';
import { AppDispatch } from '../slices';
import { logout } from '../slices/authSlice';
import Heading from '../styles/styled/Heading';
import { UserType } from '../types/users';
import composeBackgroundColor from '../utils/composeBackgroundColor';

type Props = {
  user: UserType;
  onEdit: () => void;
};

const PROFILE_IMAGE_SIZE = 150;

export default function ProfileInfo({ user }: Props) {
  const theme = useTheme();
  const isOwn = useOwnership(user._id);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Grid container alignItems="center" justifyContent="center" sx={{ mt: 10 }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          overflowY: 'visible',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
          paddingTop: 4,
          borderRadius: 2,
          backgroundColor: composeBackgroundColor(theme, 1),
          position: 'relative',
        }}
      >
        <Avatar
          src={user.image}
          sx={{
            width: PROFILE_IMAGE_SIZE,
            height: PROFILE_IMAGE_SIZE,
            position: 'absolute',
            top: -(PROFILE_IMAGE_SIZE / 2),
          }}
          alt={user.firstName}
        >
          {user.firstName[0]}
        </Avatar>
        <Heading
          variant="h3"
          component="h1"
          sx={{ mt: `${PROFILE_IMAGE_SIZE / 2}px` }}
        >
          {user.firstName} {user.lastName}
        </Heading>
        <Box
          sx={{
            display: 'flex',
            mt: 4,
            width: '100%',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}
        >
          <Typography variant="overline">Email</Typography>
          <Typography variant="body1">{user.email}</Typography>
          <Typography variant="overline" sx={{ mt: 1 }}>
            Role
          </Typography>
          <Typography variant="body1">{user.role.toLowerCase()}</Typography>
          <Box
            sx={{
              mt: 2,
              display: 'flex',
            }}
          >
            <Button variant="text" startIcon={<EditOutlined />}>
              Edit Profile
            </Button>
            <Button
              variant="text"
              sx={{ ml: 2 }}
              color="secondary"
              startIcon={<LockOutlined />}
            >
              Change Password
            </Button>
            {isOwn && (
              <Button
                onClick={handleLogout}
                variant="text"
                sx={{ ml: 'auto' }}
                color="error"
              >
                Logout
              </Button>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
