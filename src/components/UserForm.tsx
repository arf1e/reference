import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';
import useStatusBar from '../hooks/useStatusBar';
import StatusBar from '../styles/styled/StatusBar';
import { MIN_PASSWORD_LENGTH } from '../common/passwords';
import FileInput from './FileInput';
import ImagePreview from './ImagePreview';
import handleFileUpload from '../api/handleFileUpload';
import handleAsyncOperation from '../utils/handleAsyncOperation';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import { ProfileUpdateDto } from '../types/users';

function composeInitialValuesAndSchema(includePassword: boolean = false) {
  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    image: '',
    imageFile: null,
    ...(includePassword && { password: '' }),
  };
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    ...(includePassword && {
      password: yup.string().required().min(MIN_PASSWORD_LENGTH),
    }),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    image: yup.string(),
  });
  return { initialValues, validationSchema };
}

type BasicProfileInfo = ProfileUpdateDto & {
  password?: string;
  imageFile: File | null;
};

type Props = {
  providedValues?: Partial<BasicProfileInfo>;
  signup?: boolean;
  title?: string;
  btnTitle?: string;
  submitFn: (values: Omit<BasicProfileInfo, 'imageFile'>) => Promise<unknown>;
  onSuccess?: () => void;
  successMessage: string;
};

export default function UserForm({
  providedValues,
  signup = false,
  btnTitle = 'Submit',
  title,
  submitFn,
  onSuccess,
  successMessage,
}: Props) {
  const { formState, setFormState, message, setMessage } = useStatusBar();
  const theme = useTheme();
  const { initialValues, validationSchema } =
    composeInitialValuesAndSchema(signup);

  const handleAvatarInput = (
    file: File,
    formikProps: FormikProps<BasicProfileInfo>
  ) => {
    formikProps.setFieldValue('imageFile', file);
  };

  const handleClearAvatar = (formikProps: FormikProps<BasicProfileInfo>) => {
    formikProps.setFieldValue('imageFile', null);
    formikProps.setFieldValue('image', '');
  };

  const hasAvatar = (values: BasicProfileInfo) => {
    const hasImage = Boolean(values.image);
    const hasAttachedFile = Boolean(values.imageFile);
    const hasAvatar = hasImage || hasAttachedFile;
    return hasAvatar;
  };

  const avatarUrl = (values: BasicProfileInfo) => {
    if (values.image) {
      return values.image;
    }

    if (values.imageFile) {
      return URL.createObjectURL(values.imageFile);
    }

    return '';
  };

  const handleSuccess = () => {
    setFormState('SUCCESS');
    setMessage(successMessage);
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleError = (error: string) => {
    setFormState('ERROR');
    setMessage(error);
  };

  const handleSubmit = async (values: BasicProfileInfo) => {
    setFormState('LOADING');
    if (!hasAvatar(values)) {
      handleError('Please provide an avatar');
      return;
    }
    const { imageFile } = values;
    if (imageFile) {
      values.image = await handleFileUpload(imageFile, 'avatar');
    }
    const valuesToSubmit = _.omit(values, ['imageFile']);
    await handleAsyncOperation(() => submitFn(valuesToSubmit), {
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  return (
    <Box>
      <StatusBar state={formState}>{message}</StatusBar>
      <Formik
        initialValues={{ ...initialValues, ...providedValues }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <Box
            component="form"
            onSubmit={formikProps.handleSubmit}
            sx={{
              p: 2,
              borderRadius: formState === 'IDLE' ? 2 : 0,
              backgroundColor: composeBackgroundColor(theme, 1),
            }}
          >
            {title && (
              <Typography variant="h6" sx={{ mb: 2 }}>
                {title}
              </Typography>
            )}
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
            {signup && (
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
            )}
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Avatar
            </Typography>
            {!hasAvatar(formikProps.values) && (
              <FileInput
                label="Upload Image"
                name="image"
                onFile={(file) => handleAvatarInput(file, formikProps)}
              />
            )}
            {hasAvatar(formikProps.values) && (
              <ImagePreview
                size={100}
                url={avatarUrl(formikProps.values)}
                onRemove={() => handleClearAvatar(formikProps)}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={formState === 'LOADING' || !formikProps.isValid}
              sx={{ mt: 2 }}
            >
              {btnTitle}
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
}
