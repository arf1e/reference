import { Box, Button, TextField, useTheme } from '@mui/material';
import { Formik } from 'formik';
import useStatusBar from '../hooks/useStatusBar';
import * as yup from 'yup';
import StatusBar from '../styles/styled/StatusBar';
import { UpdatePasswordInput } from '../types/auth';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import useAuth from '../hooks/useAuth';
import { useUpdatePasswordMutation } from '../api/library';
import handleAsyncOperation from '../utils/handleAsyncOperation';

type UpdatePasswordValues = UpdatePasswordInput & { confirmPassword: string };

const initialValues: UpdatePasswordValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const validationSchema = yup.object().shape({
  oldPassword: yup.string().required().min(6),
  newPassword: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .required()
    .min(6)
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

export default function UpdatePasswordForm() {
  const theme = useTheme();
  const { jwt } = useAuth();
  const [updatePassword] = useUpdatePasswordMutation();
  const { formState, setFormState, message, setMessage } = useStatusBar();

  const handleUpdatePasswordSuccess = (resetForm: () => void) => {
    setFormState('SUCCESS');
    setMessage('Password updated!');
    resetForm();
  };

  const handleUpdatePasswordError = (error: string) => {
    setFormState('ERROR');
    setMessage(error);
  };

  const handleSubmit = (
    values: UpdatePasswordValues,
    resetForm: () => void
  ) => {
    setFormState('LOADING');
    handleAsyncOperation(
      () =>
        updatePassword({
          accessToken: jwt || '',
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        }),
      {
        onSuccess: () => handleUpdatePasswordSuccess(resetForm),
        onError: handleUpdatePasswordError,
      }
    );
  };
  return (
    <Box>
      <StatusBar state={formState}>{message}</StatusBar>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
      >
        {(formikProps) => (
          <Box
            component="form"
            onSubmit={formikProps.handleSubmit}
            sx={{
              backgroundColor: composeBackgroundColor(theme, 1),
              borderRadius: formState === 'IDLE' ? 2 : 0,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TextField
              name="oldPassword"
              label="Current password"
              type="password"
              value={formikProps.values.oldPassword}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              error={
                formikProps.touched.oldPassword &&
                Boolean(formikProps.errors.oldPassword)
              }
              helperText={
                formikProps.touched.oldPassword &&
                formikProps.errors.oldPassword
              }
            />
            <TextField
              name="newPassword"
              label="New password"
              type="password"
              value={formikProps.values.newPassword}
              error={
                formikProps.touched.confirmPassword &&
                Boolean(formikProps.errors.confirmPassword)
              }
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              helperText={
                formikProps.touched.confirmPassword &&
                formikProps.errors.confirmPassword
              }
            />
            <TextField
              name="confirmPassword"
              label="New password (again)"
              type="password"
              value={formikProps.values.confirmPassword}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              error={
                formikProps.touched.confirmPassword &&
                Boolean(formikProps.errors.confirmPassword)
              }
              helperText={
                formikProps.touched.confirmPassword &&
                formikProps.errors.confirmPassword
              }
            />
            <Button type="submit" variant="contained">
              Update password
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
}
