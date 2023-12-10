import { Box, Button, Grid, TextField, useTheme } from '@mui/material';
import { Formik } from 'formik';
import _ from 'lodash';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../slices';
import { clearFilters, setFilters } from '../slices/booksSlice';
import { BookFilters } from '../types/books';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import {
  AuthorsAutocompleteInput,
  GenresAutocompleteInput,
} from './AutocompleteInput';

const filtersDefaultValues: BookFilters = {
  title: '',
  author: '',
  genre: '',
};

export default function BooksFilters() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [authorInput, setAuthorInput] = useState('');
  const [genreInput, setGenreInput] = useState('');

  const applyFilters = (filters: BookFilters) => {
    dispatch(setFilters(filters));
  };

  const resetFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <Box
      sx={{
        mt: 2,
        mb: 4,
        background: composeBackgroundColor(theme, 1),
        borderRadius: 2,
        padding: 2,
      }}
    >
      <Formik
        initialValues={filtersDefaultValues}
        onSubmit={applyFilters}
        onReset={resetFilters}
      >
        {(formikProps) => (
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              formikProps.submitForm();
            }}
            onReset={(e) => {
              e.preventDefault();
              formikProps.resetForm();
            }}
          >
            <Grid
              container
              spacing={1}
              mb={1}
              sx={{
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  fullWidth
                  name="title"
                  value={formikProps.values.title}
                  onChange={formikProps.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <AuthorsAutocompleteInput
                  onChooseElement={(author) => {
                    formikProps.setFieldValue('author', author._id);
                  }}
                  onDeleteValue={() => formikProps.setFieldValue('author', '')}
                  title="Author"
                  label={
                    formikProps.values.author
                      ? 'Choose another author'
                      : 'Select an author'
                  }
                  placeholder="Search for an author"
                  inputValue={authorInput}
                  onInputChange={setAuthorInput}
                  selectedValues={_.without([formikProps.values.author], '')}
                />
              </Grid>
              <Grid item xs={12}>
                <GenresAutocompleteInput
                  onChooseElement={(genre) => {
                    formikProps.setFieldValue('genre', genre._id);
                  }}
                  onDeleteValue={() => formikProps.setFieldValue('genre', '')}
                  title="Genre"
                  label={
                    formikProps.values.genre
                      ? 'Choose another genre'
                      : 'Select a genre'
                  }
                  placeholder="Search for a genre"
                  inputValue={genreInput}
                  onInputChange={setGenreInput}
                  selectedValues={_.without([formikProps.values.genre], '')}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button type="submit">Search</Button>
              <Button type="reset" variant="text" color="error">
                Clear
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
    </Box>
  );
}
