import { ClearAllOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from '@mui/material';
import { Formik } from 'formik';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDebouncedValue from '../hooks/useDebouncedValue';
import { AppDispatch, RootState } from '../slices';
import { selectFilters, setFilters } from '../slices/booksSlice';
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
  status: '',
};

export default function BooksFilters() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const [authorInput, setAuthorInput] = useState('');
  const [genreInput, setGenreInput] = useState('');

  const filters = useSelector((state: RootState) => selectFilters(state.books));

  const [titleInput, setTitleInput] = useState(filters.title);
  const [debouncedTitleInput, resetDebouncedTitleInput] = useDebouncedValue(
    titleInput,
    500
  );

  const applyFilters = useCallback(
    (filters: BookFilters) => {
      dispatch(setFilters(filters));
    },
    [dispatch]
  );

  const provideTitleToFilters = useCallback(
    (title: string) => {
      applyFilters({ ...filters, title });
    },
    [applyFilters, filters]
  );

  const resetFilters = () => {
    dispatch(setFilters(filtersDefaultValues));
    resetDebouncedTitleInput('');
  };

  useEffect(() => {
    provideTitleToFilters(debouncedTitleInput);
  }, [debouncedTitleInput]); // eslint-disable-line react-hooks/exhaustive-deps

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
        initialValues={{ ...filtersDefaultValues, ...filters }}
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
              columnSpacing={2}
              mb={1}
              sx={{
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Title"
                  fullWidth
                  name="title"
                  value={formikProps.values.title}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                    formikProps.handleChange(e);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ToggleButtonGroup
                  value={formikProps.values.status}
                  size="large"
                  exclusive
                  color="primary"
                  onChange={(_e, value) => {
                    formikProps.setFieldValue('status', value);
                    formikProps.submitForm();
                  }}
                >
                  <ToggleButton
                    value=""
                    disabled={formikProps.values.status === ''}
                  >
                    Any book status
                  </ToggleButton>
                  <ToggleButton
                    value="available"
                    disabled={formikProps.values.status === 'available'}
                  >
                    Available
                  </ToggleButton>
                  <ToggleButton
                    value="borrowed"
                    disabled={formikProps.values.status === 'borrowed'}
                  >
                    Borrowed
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <AuthorsAutocompleteInput
                  onChooseElement={(author) => {
                    formikProps.setFieldValue('author', author._id);
                    formikProps.submitForm();
                  }}
                  onDeleteValue={() => {
                    formikProps.setFieldValue('author', '');
                    formikProps.submitForm();
                  }}
                  title="Author"
                  label={
                    formikProps.values.author
                      ? 'Choose another author'
                      : 'Select an author'
                  }
                  placeholder="Search for an author"
                  inputValue={authorInput}
                  replace
                  onInputChange={setAuthorInput}
                  selectedValues={_.without([formikProps.values.author], '')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <GenresAutocompleteInput
                  onChooseElement={(genre) => {
                    formikProps.setFieldValue('genre', genre._id);
                    formikProps.submitForm();
                  }}
                  onDeleteValue={() => {
                    formikProps.setFieldValue('genre', '');
                    formikProps.submitForm();
                  }}
                  title="Genre"
                  replace
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
              <Button
                type="reset"
                variant="text"
                disabled={_.isEqual(formikProps.values, filtersDefaultValues)}
                color="error"
                startIcon={<ClearAllOutlined />}
                onClick={() => {
                  formikProps.resetForm({ values: filtersDefaultValues });
                }}
              >
                Clear Filters
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
    </Box>
  );
}
