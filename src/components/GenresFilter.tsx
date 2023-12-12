import { ClearAllOutlined } from '@mui/icons-material';
import _ from 'lodash';
import { Box, Button, Grid, TextField, useTheme } from '@mui/material';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../slices';
import {
  clearGenresFilters,
  selectGenresFilters,
  setGenresFilters,
} from '../slices/genresSlice';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import { GenreFilters } from '../types/genres';
import { useEffect, useState } from 'react';
import useDebouncedValue from '../hooks/useDebouncedValue';

const filtersDefaultValues = {
  title: '',
};

export default function GenresFilter() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const filters = useSelector((state: RootState) =>
    selectGenresFilters(state.genres)
  );

  const [titleInput, setTitleInput] = useState(filters.title);
  const [debouncedInput, resetDebouncedInput] = useDebouncedValue(
    titleInput,
    500
  );

  const handleSubmit = (values: GenreFilters) => {
    dispatch(setGenresFilters(values));
  };

  const clearFilters = () => {
    dispatch(clearGenresFilters());
    resetDebouncedInput('');
  };

  useEffect(() => {
    handleSubmit({ title: debouncedInput });
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
                label="Search genres by title"
                name="title"
                value={formikProps.values.title}
                onChange={(e) => {
                  formikProps.handleChange(e);
                  setTitleInput(e.target.value);
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
