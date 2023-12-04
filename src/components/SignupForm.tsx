import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useSignupMutation } from '../api/library';
import { SignupInput } from '../types/auth';
import composeBackgroundColor from '../utils/composeBackgroundColor';

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
  const theme = useTheme();
  const [signup] = useSignupMutation();

  const handleSignup = async (values: SignupInput) => {
    console.log(values);
    try {
      const res = await signup(values);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
              borderRadius: 2,
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
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
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
    </>
  );
}
