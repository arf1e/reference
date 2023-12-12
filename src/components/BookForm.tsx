import { BookDto, BookType } from '../types/books';
import { Formik, FormikProps } from 'formik';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import StatusBar from '../styles/styled/StatusBar';
import useStatusBar from '../hooks/useStatusBar';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import FileInput from './FileInput';
import { DateField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import _ from 'lodash';
import { WithImageFile } from '../types/common';
import ImagePreview from './ImagePreview';
import handleFileUpload from '../api/handleFileUpload';
import handleAsyncOperation from '../utils/handleAsyncOperation';
import { useState } from 'react';
import {
  AuthorsAutocompleteInput,
  GenresAutocompleteInput,
} from './AutocompleteInput';
import { bookValidationSchema } from '../schemas/books';
import { convertBookToFormValues } from '../utils/books';
import { getImageUrl, handleClearImage, hasImage } from '../utils/images';

type Props = {
  providedValues?: BookType;
  onSubmit: (book: BookDto) => Promise<any>;
  successMessage: string;
};

type FormType = WithImageFile<BookDto>;

const initialValues: FormType = {
  title: '',
  isbn: '',
  publisher: '',
  image: '',
  authors: [],
  genres: [],
  publishedDate: '',
  imageFile: null,
};

export default function BookForm({
  providedValues,
  onSubmit,
  successMessage,
}: Props) {
  const { formState, setFormState, message, setMessage } = useStatusBar();
  const [authorInput, setAuthorInput] = useState('');
  const [genreInput, setGenreInput] = useState('');
  const theme = useTheme();

  const handleClearCover = (formikProps: FormikProps<FormType>) =>
    handleClearImage(formikProps);

  const hasCover = (values: FormType) => hasImage(values);

  const coverUrl = (values: FormType) => getImageUrl(values);

  const handleSubmit = async (values: FormType) => {
    setFormState('LOADING');
    if (!hasCover(values)) {
      setFormState('ERROR');
      setMessage('Please upload a cover');
      return;
    }
    if (values.imageFile) {
      try {
        values.image = await handleFileUpload(values.imageFile);
      } catch (error) {
        setFormState('ERROR');
        setMessage('Error uploading the cover');
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
          ...(providedValues ? convertBookToFormValues(providedValues) : {}),
        }}
        validationSchema={bookValidationSchema}
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
            <Grid container columns={12} spacing={2} mb={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Basic details</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="ISBN"
                  name="isbn"
                  fullWidth
                  value={formikProps.values.isbn}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  label="Title"
                  name="title"
                  fullWidth
                  value={formikProps.values.title}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <AuthorsAutocompleteInput
                  onChooseElement={(author) => {
                    formikProps.setFieldValue('authors', [
                      ...formikProps.values.authors,
                      author._id,
                    ]);
                  }}
                  onDeleteValue={(author) =>
                    formikProps.setFieldValue(
                      'authors',
                      _.without(formikProps.values.authors, author)
                    )
                  }
                  title="Authors"
                  label="Add author"
                  placeholder="Search for an author"
                  inputValue={authorInput}
                  onInputChange={setAuthorInput}
                  selectedValues={formikProps.values.authors}
                />
              </Grid>
              <Grid item xs={12}>
                <GenresAutocompleteInput
                  onChooseElement={(genre) => {
                    formikProps.setFieldValue('genres', [
                      ...formikProps.values.genres,
                      genre._id,
                    ]);
                  }}
                  onDeleteValue={(genre) =>
                    formikProps.setFieldValue(
                      'genres',
                      _.without(formikProps.values.genres, genre)
                    )
                  }
                  title="Genres"
                  label="Add genre"
                  placeholder="Search for a genre"
                  inputValue={genreInput}
                  onInputChange={setGenreInput}
                  selectedValues={formikProps.values.genres}
                />
              </Grid>
            </Grid>
            <Grid container columns={12} spacing={2} mb={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Publishing</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  label="Publisher"
                  name="publisher"
                  value={formikProps.values.publisher}
                  fullWidth
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <DateField
                  format="YYYY-MM-DD"
                  label="Publication Date"
                  name="publishedDate"
                  value={dayjs(formikProps.values.publishedDate)}
                  onChange={(value) =>
                    formikProps.setFieldValue(
                      'publishedDate',
                      dayjs(value).format('YYYY-MM-DD')
                    )
                  }
                  fullWidth
                />
              </Grid>
            </Grid>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Cover
            </Typography>
            {!hasCover(formikProps.values) && (
              <FileInput
                label="Upload book cover"
                name="image"
                onFile={(file) => formikProps.setFieldValue('imageFile', file)}
              />
            )}
            {hasCover(formikProps.values) && (
              <ImagePreview
                size={100}
                url={coverUrl(formikProps.values)}
                onRemove={() => handleClearCover(formikProps)}
              />
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{ my: 2 }}
              fullWidth
              disabled={formState === 'LOADING' || !formikProps.isValid}
            >
              {providedValues ? 'Update' : 'Add'}
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
}
