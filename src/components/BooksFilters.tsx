import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { Formik } from 'formik';
import Heading from '../styles/styled/Heading';
import { ApiResponse, WithPagination } from '../types/api';
import { AuthorType, GenreType } from '../types/books';
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

export default function BooksFilters() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        my: 4,
        background: composeBackgroundColor(theme, 1),
        borderRadius: 4,
        padding: 4,
      }}
    >
      <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
        Filters
      </Typography>
      <Formik initialValues={{ title: '' }} onSubmit={console.log}>
        {(formikProps) => (
          <Box
            component="form"
            sx={{}}
            onSubmit={(e) => {
              e.preventDefault();
              formikProps.submitForm();
            }}
          >
            <Box
              sx={{
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                name="title"
                value={formikProps.values.title}
                onChange={formikProps.handleChange}
                sx={{ mb: 2 }}
              />
              <AuthorsAutocompleteInput
                onChooseElement={console.log}
                suggestionsExtractor={({ data }) => data.authors}
                valueExtractor={(author) => author.name}
                endpoint="authors"
                param="name"
                label="Author"
              />
              <GenresAutocompleteInput
                onChooseElement={console.log}
                valueExtractor={(genre) => genre.title}
                suggestionsExtractor={({ data }) => data.genres}
                label="Genre"
                endpoint="genres"
                param="title"
              />
            </Box>
            <Button variant="contained" color="primary" type="submit">
              Search
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
}
