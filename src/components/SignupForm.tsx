import { Box, Button, Zoom } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../api/library';
import { SignupInput } from '../types/auth';
import UserForm from './UserForm';

type Props = {
  switchToLogin: () => void;
};

export default function SignupForm({ switchToLogin }: Props) {
  const navigate = useNavigate();
  const [signup] = useSignupMutation();

  return (
    <Zoom in={true}>
      <Box>
        <UserForm
          signup
          submitFn={(values) => signup(values as SignupInput)}
          onSuccess={() => navigate('/me')}
          successMessage="Account created!"
        />
        <Box justifyContent="flex-end" sx={{ mt: 1 }} display="flex">
          <Button variant="text" onClick={switchToLogin}>
            Oh wait, I already have an account
          </Button>
        </Box>
      </Box>
    </Zoom>
  );
}
