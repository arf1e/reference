import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCreateAuthorMutation } from '../api/library';
import AuthorForm from '../components/AuthorForm';
import FormPage from '../components/FormPage';
import useAuth from '../hooks/useAuth';
import { AuthorDto } from '../types/authors';

export default function CreateAuthor() {
  const { jwt } = useAuth();
  const [createAuthor] = useCreateAuthorMutation();
  const navigate = useNavigate();
  const handleCreateAuthor = async (author: AuthorDto) =>
    createAuthor({
      accessToken: jwt || '',
      authorData: author,
    });
  return (
    <FormPage title="Create author">
      <Box alignItems="flex-start" mb={1}>
        <Button startIcon={<ChevronLeft />} onClick={() => navigate(-1)}>
          Go back
        </Button>
      </Box>
      <AuthorForm
        onSubmit={handleCreateAuthor}
        successMessage="Author created!"
      />
    </FormPage>
  );
}
