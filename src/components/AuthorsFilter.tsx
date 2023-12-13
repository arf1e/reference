import { ClearAllOutlined } from '@mui/icons-material';
import _ from 'lodash';
import { Box, Button, Grid, TextField, useTheme } from '@mui/material';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../slices';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import { useEffect, useState } from 'react';
import useDebouncedValue from '../hooks/useDebouncedValue';
import {
  clearAuthorsFilters,
  selectAuthorsFilters,
  setAuthorsFilters,
} from '../slices/authorsSlice';
import { AuthorFilters } from '../types/authors';

const filtersDefaultValues = {
  name: '',
};

export default function AuthorsFilter() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const filters = useSelector((state: RootState) =>
    selectAuthorsFilters(state.authors)
  );

  const [nameInput, setNameInput] = useState(filters.name);
  const [debouncedInput, resetDebouncedInput] = useDebouncedValue(
    nameInput,
    500
  );

  const handleSubmit = (values: AuthorFilters) => {
    dispatch(setAuthorsFilters(values));
  };

  const clearFilters = () => {
    dispatch(clearAuthorsFilters());
    resetDebouncedInput('');
  };

  useEffect(() => {
    handleSubmit({ name: debouncedInput });
  }, [debouncedInput]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Grid item xs={12}>
      <Box
        sx={{
          backgroundColor: composeBackgroundColor(theme, 1),
          p: 2,
          borderRadius: 2,
        }}
      >
        <Formik
          initialValues={{ ...filtersDefaultValues, ...filters }}
          onSubmit={handleSubmit}
          onReset={clearFilters}
        >
          {(formikProps) => (
            <Box
              component="form"
              onSubmit={formikProps.handleSubmit}
              display="flex"
              gap={2}
            >
              <TextField
                fullWidth
                sx={{
                  flex: 4,
                }}
                label="Search authors by name"
                name="name"
                value={formikProps.values.name}
                onChange={(e) => {
                  formikProps.handleChange(e);
                  setNameInput(e.target.value);
                }}
              />
              <Button
                type="reset"
                color="error"
                disabled={_.isEqual(formikProps.values, filtersDefaultValues)}
                fullWidth
                sx={{ flex: 1 }}
                startIcon={<ClearAllOutlined />}
                onClick={() => {
                  formikProps.resetForm({ values: filtersDefaultValues });
                }}
              >
                Reset
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </Grid>
  );
}
