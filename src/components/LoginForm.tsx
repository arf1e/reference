import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  Zoom,
} from '@mui/material';
import { Formik } from 'formik';
import { useCallback } from 'react';
import * as yup from 'yup';
import { useLoginMutation } from '../api/library';
import useStatusBar from '../hooks/useStatusBar';
import StatusBar from '../styles/styled/StatusBar';
import { LoginInput } from '../types/auth';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import handleAsyncOperation from '../utils/handleAsyncOperation';

const initialValues: LoginInput = {
  email: '',
  password: '',
};

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

type Props = {
  switchToSignup: () => void;
};

export default function LoginForm({ switchToSignup }: Props) {
  const { formState, message, setFormState, setMessage } = useStatusBar();
  const theme = useTheme();
  const [login] = useLoginMutation();

  const handleLoginSuccess = useCallback(() => {
    setFormState('SUCCESS');
    setMessage('Login successful');
  }, [setFormState, setMessage]);

  const handleLoginError = useCallback(
    (error: string) => {
      setFormState('ERROR');
      setMessage(error);
    },
    [setFormState, setMessage]
  );

  const handleLogin = async (values: LoginInput) => {
    setFormState('LOADING');
    await handleAsyncOperation(() => login(values), {
      onSuccess: handleLoginSuccess,
      onError: handleLoginError,
    });
  };

  return (
    <Zoom in={true}>
      <Box>
        <StatusBar state={formState}>{message}</StatusBar>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {(formikProps) => (
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                formikProps.handleSubmit();
              }}
              sx={{
                backgroundColor: composeBackgroundColor(theme, 1),
                borderRadius: formState === 'IDLE' ? 2 : 0,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Login
              </Typography>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formikProps.values.email}
                onChange={formikProps.handleChange('email')}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formikProps.values.password}
                onChange={formikProps.handleChange('password')}
                sx={{ mb: 4 }}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={formState === 'LOADING'}
              >
                Login
              </Button>
            </Box>
          )}
        </Formik>
        <Box sx={{ display: 'flex', mt: 1, justifyContent: 'flex-end' }}>
          <Button variant="text" onClick={switchToSignup}>
            I don't have an account
          </Button>
        </Box>
      </Box>
    </Zoom>
  );
}
