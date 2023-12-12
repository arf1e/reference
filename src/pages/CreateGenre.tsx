import { Box, Zoom } from '@mui/material';
import { useCreateGenreMutation } from '../api/library';
import FormPage from '../components/FormPage';
import GenreForm from '../components/GenreForm';
import useAuth from '../hooks/useAuth';

export default function CreateGenre() {
  const [createGenre] = useCreateGenreMutation();
  const { jwt } = useAuth();

  return (
    <Zoom in={true}>
      <Box>
        <FormPage title="New Genre">
          <GenreForm
            successMessage="Genre has been created"
            buttonTitle="Create genre"
            backLink="/"
            backTitle="Back to main"
            onSubmit={(values) =>
              createGenre({ accessToken: jwt || '', genreData: values })
            }
          />
        </FormPage>
      </Box>
    </Zoom>
  );
}
