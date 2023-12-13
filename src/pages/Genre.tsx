import {
  ChevronLeftOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@mui/icons-material';
import { Box, Button, Container } from '@mui/material';
import pluralize from 'pluralize';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteGenreByIdMutation,
  useGetGenreByIdQuery,
} from '../api/library';
import BooksBy from '../components/BooksBy';
import ConfirmDestructiveAction from '../components/ConfirmDestuctiveAction';
import DisplayError from '../components/DisplayError';
import EntityLoading from '../components/EntityLoading';
import Meta from '../components/Meta';
import useAuth from '../hooks/useAuth';
import useToaster from '../hooks/useToaster';
import Heading from '../styles/styled/Heading';
import handleAsyncOperation from '../utils/handleAsyncOperation';

export default function Genre() {
  const { id } = useParams<{ id: string }>() as { id: string };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isAdmin, jwt } = useAuth();
  const navigate = useNavigate();
  const { showInfoMessage, showErrorMessage } = useToaster();
  const [deleteGenre] = useDeleteGenreByIdMutation();

  const {
    data: genreResponse,
    isFetching,
    isError,
    error,
  } = useGetGenreByIdQuery(id);

  const onDeleteSuccess = () => {
    setIsDialogOpen(false);
    showInfoMessage('Genre has been deleted');
    navigate('/genres');
  };

  const onDeleteError = (error: string) => {
    showErrorMessage(error);
  };

  const handleDelete = async () => {
    await handleAsyncOperation(
      () => deleteGenre({ accessToken: jwt || '', id }),
      {
        onSuccess: onDeleteSuccess,
        onError: onDeleteError,
        expectEmptyResponse: true,
      }
    );
  };

  return (
    <Box sx={{ mb: 12 }}>
      <Meta pageTitle={genreResponse?.data.title || 'Genre'} />
      {isFetching && <EntityLoading />}
      {isError && (
        <DisplayError
          sx={{ my: 8 }}
          title="Failed to fetch the genre."
          errorOutput={error}
          singleEntity
        />
      )}
      {genreResponse?.data && (
        <Container>
          <Box mb={2}>
            <Link to="/genres">
              <Button startIcon={<ChevronLeftOutlined />}>Genres</Button>
            </Link>
          </Box>
          <Box mb={4}>
            <Heading variant="h3" component="h1" alignSelf="flex-start">
              {genreResponse.data.title}
            </Heading>
            {isAdmin && (
              <Box mt={1}>
                <Link to={`/genres/${id}/edit`}>
                  <Button startIcon={<EditOutlined />}>Edit Genre</Button>
                </Link>
                <Button
                  startIcon={<DeleteOutlined />}
                  color="error"
                  sx={{
                    ml: 2,
                  }}
                  onClick={() => setIsDialogOpen(true)}
                >
                  Delete Genre
                </Button>
              </Box>
            )}
          </Box>
          <BooksBy genre={genreResponse.data} />
          <ConfirmDestructiveAction
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            cancelBtnText="Oh no, take me back"
            confirmBtnText="Delete"
            onConfirm={handleDelete}
            heading={`Delete genre "${genreResponse.data.title}"?`}
            {...(genreResponse.data.booksCount > 0 && {
              description: `${genreResponse.data.booksCount} ${pluralize(
                'book',
                genreResponse.data.booksCount
              )} will lose the link to it.`,
            })}
          />
        </Container>
      )}
    </Box>
  );
}
