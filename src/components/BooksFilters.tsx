import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../slices';
import { clearFilters, setFilters } from '../slices/booksSlice';
import { ApiResponse, WithPagination } from '../types/api';
import { AuthorType } from '../types/authors';
import { BookFilters } from '../types/books';
import { GenreType } from '../types/genres';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import AutocompleteInput from './AutocompleteInput';

const AuthorsAutocompleteInput = AutocompleteInput<
  AuthorType,
  ApiResponse<WithPagination<{ authors: AuthorType[] }>>
>;
const GenresAutocompleteInput = AutocompleteInput<
  GenreType,
  ApiResponse<WithPagination<{ genres: GenreType[] }>>
>;

const filtersDefaultValues: BookFilters = {
  title: '',
  author: '',
  genre: '',
};

export default function BooksFilters() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const applyFilters = (filters: BookFilters) => {
    dispatch(setFilters(filters));
  };

  const resetFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <Box
      sx={{
        my: 4,
        background: composeBackgroundColor(theme, 1),
        borderRadius: 2,
        padding: 2,
      }}
    >
      <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
        Filters
      </Typography>
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
            <Box
              sx={{
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <TextField
                label="Title"
                variant="filled"
                fullWidth
                name="title"
                value={formikProps.values.title}
                onChange={formikProps.handleChange}
              />
              <AuthorsAutocompleteInput
                onChooseElement={(author) =>
                  formikProps.setFieldValue('author', author._id)
                }
                suggestionsExtractor={({ data }) => data.authors}
                valueExtractor={(author) => author.name}
                fullWidth
                endpoint="authors"
                variant="filled"
                param="name"
                label="Author"
              />
              <GenresAutocompleteInput
                onChooseElement={(genre) =>
                  formikProps.setFieldValue('genre', genre._id)
                }
                valueExtractor={(genre) => genre.title}
                suggestionsExtractor={({ data }) => data.genres}
                fullWidth
                label="Genre"
                variant="filled"
                endpoint="genres"
                param="title"
              />
            </Box>
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
