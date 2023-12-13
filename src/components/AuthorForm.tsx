import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Formik } from 'formik';
import _ from 'lodash';
import handleFileUpload from '../api/handleFileUpload';
import useStatusBar from '../hooks/useStatusBar';
import { authorValidationSchema } from '../schemas/authors';
import StatusBar from '../styles/styled/StatusBar';
import { AuthorDto, AuthorType } from '../types/authors';
import { WithImageFile } from '../types/common';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import handleAsyncOperation from '../utils/handleAsyncOperation';
import { getImageUrl, handleClearImage, hasImage } from '../utils/images';
import FileInput from './FileInput';
import ImagePreview from './ImagePreview';

type Props = {
  providedValues?: AuthorType;
  onSubmit: (values: AuthorDto) => Promise<unknown>;
  successMessage: string;
};

type FormType = WithImageFile<AuthorDto>;

const initialValues: FormType = {
  name: '',
  bio: '',
  image: '',
  imageFile: null,
};

const convertAuthorToFormValues = (author: AuthorType) => {
  return {
    ..._.pick(author, ['name', 'bio', 'image']),
    imageFile: null,
  };
};

export default function AuthorForm({
  providedValues,
  onSubmit,
  successMessage,
}: Props) {
  const { formState, setFormState, message, setMessage } = useStatusBar();
  const theme = useTheme();

  const handleSubmit = async (values: FormType) => {
    setFormState('LOADING');
    if (!hasImage(values)) {
      setFormState('ERROR');
      setMessage('Please upload author image');
      return;
    }

    if (values.imageFile) {
      try {
        values.image = await handleFileUpload(values.imageFile, 'author');
      } catch (error) {
        setFormState('ERROR');
        setMessage('Error uploading image');
        return;
      }
    }
    const valuesToSubmit = _.omit(values, ['imageFile']);
    await handleAsyncOperation(() => onSubmit(valuesToSubmit), {
      onSuccess: () => {
        setFormState('SUCCESS');
        setMessage(successMessage);
      },
      onError: (error) => {
        setFormState('ERROR');
        setMessage(error);
      },
    });
  };

  return (
    <Box>
      <StatusBar state={formState}>{message}</StatusBar>
      <Formik
        initialValues={{
          ...initialValues,
          ...(providedValues ? convertAuthorToFormValues(providedValues) : {}),
        }}
        validationSchema={authorValidationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Box
            component="form"
            onSubmit={formikProps.handleSubmit}
            sx={{
              p: 2,
              backgroundColor: composeBackgroundColor(theme, 1),
              borderRadius: formState === 'IDLE' ? 2 : 0,
            }}
          >
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={formikProps.values.name}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              error={
                formikProps.touched.name && Boolean(formikProps.errors.name)
              }
              sx={{ mb: 2 }}
            />
            <TextField
              label="Bio"
              name="bio"
              fullWidth
              multiline
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              error={formikProps.touched.bio && Boolean(formikProps.errors.bio)}
              rows={6}
              value={formikProps.values.bio}
              sx={{ mb: 2 }}
            />
            {!hasImage(formikProps.values) && (
              <FileInput
                label="Upload author image"
                name="image"
                onFile={(file) => formikProps.setFieldValue('imageFile', file)}
              />
            )}
            {hasImage(formikProps.values) && (
              <ImagePreview
                size={100}
                url={getImageUrl(formikProps.values)}
                onRemove={() => handleClearImage(formikProps)}
              />
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{ my: 2 }}
              fullWidth
              disableElevation
              disabled={formState === 'LOADING' || !formikProps.isValid}
            >
              {providedValues ? 'Update' : 'Create'}
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
}
