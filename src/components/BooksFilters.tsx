import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../slices';
import { clearFilters, setFilters } from '../slices/booksSlice';
import { BookFilters } from '../types/books';
import composeBackgroundColor from '../utils/composeBackgroundColor';

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
                fullWidth
                name="title"
                value={formikProps.values.title}
                onChange={formikProps.handleChange}
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
