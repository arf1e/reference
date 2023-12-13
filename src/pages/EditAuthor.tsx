import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Zoom } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetAuthorByIdQuery,
  useUpdateAuthorByIdMutation,
} from '../api/library';
import AuthorForm from '../components/AuthorForm';
import DisplayError from '../components/DisplayError';
import FormPage from '../components/FormPage';
import useAuth from '../hooks/useAuth';

export default function EditAuthor() {
  const { id } = useParams<{ id: string }>() as { id: string };
  const [updateAuthor] = useUpdateAuthorByIdMutation();
  const navigate = useNavigate();
  const { data: authorResponse, isError, error } = useGetAuthorByIdQuery(id);
  const { jwt } = useAuth();

  return (
    <Box>
      {authorResponse?.data && (
        <Zoom in={true}>
          <Box>
            <FormPage title="Update Author">
              <Box
                sx={{ mb: 1, display: 'flex', justifyContent: 'flex-start' }}
              >
                <Button
                  startIcon={<ChevronLeft />}
                  onClick={() => navigate(-1)}
                >
                  Go back
                </Button>
              </Box>
              <AuthorForm
                successMessage="Author has been updated"
                onSubmit={(values) =>
                  updateAuthor({
                    accessToken: jwt || '',
                    id,
                    authorData: values,
                  })
                }
                providedValues={authorResponse.data}
              />
            </FormPage>
          </Box>
        </Zoom>
      )}
      {isError && (
        <DisplayError
          title="Failed to fetch the author"
          description="That's most likely our fault."
          errorOutput={error}
          singleEntity
          my={8}
        />
      )}
    </Box>
  );
}
