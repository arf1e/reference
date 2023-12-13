import { ChevronLeftOutlined } from '@mui/icons-material';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import useStatusBar from '../hooks/useStatusBar';
import StatusBar from '../styles/styled/StatusBar';
import { GenreDto, GenreType } from '../types/genres';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import handleAsyncOperation from '../utils/handleAsyncOperation';

type Props = {
  providedValues?: GenreType;
  buttonTitle?: string;
  resetOnSuccess?: boolean;
  successMessage: string;
  backLink: string;
  backTitle: string;
  onSubmit: (values: GenreDto) => Promise<unknown>;
};

const initialValues: GenreDto = {
  title: '',
};

export default function GenreForm({
  providedValues,
  onSubmit,
  resetOnSuccess = false,
  backLink,
  successMessage,
  buttonTitle,
  backTitle,
}: Props) {
  const { formState, setFormState, message, setMessage } = useStatusBar();
  const theme = useTheme();

  const handleSubmit = async (values: GenreDto, resetForm: () => void) => {
    setFormState('LOADING');
    await handleAsyncOperation(() => onSubmit(values), {
      onSuccess: () => {
        setFormState('SUCCESS');
        setMessage(successMessage);
        resetOnSuccess && resetForm();
      },
      onError: (error) => {
        setFormState('ERROR');
        setMessage(error);
      },
    });
  };

  return (
    <Box>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        <Link to={backLink}>
          <Button startIcon={<ChevronLeftOutlined />}>{backTitle}</Button>
        </Link>
      </Box>
      <StatusBar state={formState}>{message}</StatusBar>
      <Formik
        initialValues={{ ...initialValues, ...providedValues }}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
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
              name="title"
              label="Title"
              fullWidth
              value={formikProps.values.title}
              onChange={formikProps.handleChange}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              disabled={formState === 'LOADING'}
            >
              {buttonTitle || 'Submit'}
            </Button>
          </Box>
        )}
      </Formik>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          opacity: 0.6,
        }}
      >
        <Typography variant="body1">
          An idiot admires complexity, whereas a genius admires simplicity.
        </Typography>
        <Typography variant="caption">– Terry A. Davis</Typography>
      </Box>
    </Box>
  );
}
