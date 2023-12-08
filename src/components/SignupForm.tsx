import { DeleteOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
  Zoom,
} from '@mui/material';
import { Formik, FormikProps } from 'formik';
import _ from 'lodash';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import handleFileUpload from '../api/handleFileUpload';
import { useSignupMutation } from '../api/library';
import useStatusBar from '../hooks/useStatusBar';
import StatusBar from '../styles/styled/StatusBar';
import { SignupInput } from '../types/auth';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import handleAsyncOperation from '../utils/handleAsyncOperation';
import FileInput from './FileInput';
import ImagePreview from './ImagePreview';

type Props = {
  switchToLogin: () => void;
};

type ExtendedSignupInput = SignupInput & {
  imageFile: File | null;
};

const initialValues: ExtendedSignupInput = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  image: '',
  imageFile: null,
};

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  imageFile: yup.mixed().required(),
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

  const handleSignup = async (values: ExtendedSignupInput) => {
    setFormState('LOADING');
    const { imageFile } = values;
    const image = await handleFileUpload(imageFile as File);
    const valuesToSubmit = _.omit(values, ['imageFile']);
    console.log('valuesToSubmit', valuesToSubmit);
    await handleAsyncOperation(() => signup({ ...valuesToSubmit, image }), {
      onSuccess: handleSignupSuccess,
      onError: handleSignupError,
    });
  };

  const handleAvatarInput = (
    file: File,
    formikProps: FormikProps<ExtendedSignupInput>
  ) => {
    formikProps.setFieldValue('imageFile', file);
  };

  const handleRemoveImage = (formikProps: FormikProps<ExtendedSignupInput>) => {
    formikProps.setFieldValue('imageFile', null);
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
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Basic info
              </Typography>
              <Grid container columns={12} spacing={1} mb={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    error={
                      formikProps.touched.firstName &&
                      Boolean(formikProps.errors.firstName)
                    }
                    fullWidth
                    value={formikProps.values.firstName}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    error={
                      formikProps.touched.lastName &&
                      Boolean(formikProps.errors.lastName)
                    }
                    fullWidth
                    onBlur={formikProps.handleBlur}
                    value={formikProps.values.lastName}
                    onChange={formikProps.handleChange}
                  />
                </Grid>
              </Grid>
              <TextField
                label="Email"
                name="email"
                type="email"
                error={
                  formikProps.touched.email && Boolean(formikProps.errors.email)
                }
                fullWidth
                value={formikProps.values.email}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                error={
                  formikProps.touched.password &&
                  Boolean(formikProps.errors.password)
                }
                fullWidth
                value={formikProps.values.password}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                sx={{ mb: 2 }}
              />
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Avatar
              </Typography>
              {!formikProps.values.imageFile && (
                <FileInput
                  label="Upload Image"
                  name="image"
                  onFile={(file) => handleAvatarInput(file, formikProps)}
                />
              )}
              {formikProps.values.imageFile && (
                <ImagePreview
                  file={formikProps.values.imageFile as File}
                  size={200}
                  onRemove={() => handleRemoveImage(formikProps)}
                />
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={formState === 'LOADING' || !formikProps.isValid}
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
