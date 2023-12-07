import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
  Zoom,
} from '@mui/material';
import { Formik } from 'formik';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useSignupMutation } from '../api/library';
import useStatusBar from '../hooks/useStatusBar';
import StatusBar from '../styles/styled/StatusBar';
import { SignupInput } from '../types/auth';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import handleAsyncOperation from '../utils/handleAsyncOperation';

type Props = {
  switchToLogin: () => void;
};

const initialValues: SignupInput = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  image: '',
};

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  image: yup.string().url().required(),
});

export default function SignupForm({ switchToLogin }: Props) {
  const { formState, message, setFormState, setMessage } = useStatusBar();
  const navigate = useNavigate();
  const theme = useTheme();
  const [signup] = useSignupMutation();

  const handleSignupSuccess = useCallback(() => {
    setFormState('SUCCESS');
    setMessage('Account created successfully');
    navigate('/me');
  }, [setFormState, setMessage, navigate]);

  const handleSignupError = useCallback(
    (error: string) => {
      setFormState('ERROR');
      setMessage(error);
    },
    [setFormState, setMessage]
  );

  const handleSignup = async (values: SignupInput) => {
    setFormState('LOADING');
    await handleAsyncOperation(() => signup(values), {
      onSuccess: handleSignupSuccess,
      onError: handleSignupError,
    });
  };

  return (
    <Zoom in={true}>
      <Box>
        <StatusBar state={formState}>{message}</StatusBar>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
        >
          {(formikProps) => (
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                formikProps.handleSubmit();
              }}
              sx={{
                p: 2,
                borderRadius: formState === 'IDLE' ? 2 : 0,
                backgroundColor: composeBackgroundColor(theme, 1),
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Create a new account
              </Typography>
              <Grid container columns={12} spacing={1} mb={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    fullWidth
                    value={formikProps.values.firstName}
                    onChange={formikProps.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    fullWidth
                    value={formikProps.values.lastName}
                    onChange={formikProps.handleChange}
                  />
                </Grid>
              </Grid>
              <TextField
                label="Email"
                name="email"
                fullWidth
                value={formikProps.values.email}
                onChange={formikProps.handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                value={formikProps.values.password}
                onChange={formikProps.handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Image"
                name="image"
                fullWidth
                value={formikProps.values.image}
                onChange={formikProps.handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
              >
                Sign up
              </Button>
            </Box>
          )}
        </Formik>
        <Box justifyContent="flex-end" sx={{ mt: 1 }} display="flex">
          <Button variant="text" onClick={switchToLogin}>
            Oh wait, I already have an account
          </Button>
        </Box>
      </Box>
    </Zoom>
  );
}
