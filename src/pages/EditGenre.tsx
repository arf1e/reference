import { Box, Zoom } from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  useGetGenreByIdQuery,
  useUpdateGenreByIdMutation,
} from '../api/library';
import DisplayError from '../components/DisplayError';
import FormPage from '../components/FormPage';
import GenreForm from '../components/GenreForm';
import useAuth from '../hooks/useAuth';

export default function EditGenre() {
  const { id } = useParams<{ id: string }>() as { id: string };
  const [updateGenre] = useUpdateGenreByIdMutation();
  const { data: genreResponse, isError, error } = useGetGenreByIdQuery(id);
  const { jwt } = useAuth();

  return (
    <Box>
      {genreResponse?.data && (
        <Zoom in={true}>
          <Box>
            <FormPage title="Update Genre">
              <GenreForm
                backLink={`/genres/${id}`}
                successMessage="Genre has been updated"
                buttonTitle="Update title"
                backTitle="Back to the genre"
                providedValues={genreResponse.data}
                onSubmit={(values) =>
                  updateGenre({ accessToken: jwt || '', genreData: values, id })
                }
              />
            </FormPage>
          </Box>
        </Zoom>
      )}
      {isError && (
        <DisplayError
          title="Failed to fetch the genre."
          description="That's most likely our fault."
          errorOutput={error}
          singleEntity
          my={8}
        />
      )}
    </Box>
  );
}
