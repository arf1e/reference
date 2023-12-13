import {
  ChevronLeftOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@mui/icons-material';
import { Box, Button, Container, Fade, Grid, Typography } from '@mui/material';
import pluralize from 'pluralize';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteAuthorByIdMutation,
  useGetAuthorByIdQuery,
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

export default function Author() {
  const { id } = useParams<{ id: string }>() as { id: string };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isAdmin, jwt } = useAuth();
  const navigate = useNavigate();
  const { showInfoMessage, showErrorMessage } = useToaster();
  const [deleteAuthor] = useDeleteAuthorByIdMutation();

  const {
    data: authorResponse,
    isFetching,
    isError,
    error,
  } = useGetAuthorByIdQuery(id);

  const onDeleteSuccess = () => {
    setIsDialogOpen(false);
    showInfoMessage('Author deleted successfully');
    navigate('/authors');
  };

  const onDeleteError = () => {
    showErrorMessage('Failed to delete author');
  };

  const handleDelete = async () => {
    await handleAsyncOperation(
      () => deleteAuthor({ id, accessToken: jwt || '' }),
      {
        onSuccess: onDeleteSuccess,
        onError: onDeleteError,
        expectEmptyResponse: true,
      }
    );
  };

  return (
    <Box>
      <Meta pageTitle={authorResponse?.data.name || 'Author'} />
      {isFetching && <EntityLoading />}
      {isError && (
        <DisplayError
          sx={{ my: 8 }}
          title="Failed to fetch the author."
          errorOutput={error}
        />
      )}
      {authorResponse?.data && (
        <Container>
          <Fade in={true}>
            <Box>
              <Box mb={2}>
                <Link to="/authors">
                  <Button startIcon={<ChevronLeftOutlined />}>Authors</Button>
                </Link>
              </Box>
              <Grid container spacing={4} alignItems="center" my={8}>
                <Grid item xs={4} md={3}>
                  <img
                    src={authorResponse.data.image}
                    alt={authorResponse.data.name}
                    width="100%"
                    style={{ borderRadius: '50%', objectFit: 'contain' }}
                  />
                </Grid>
                <Grid item xs={8} md={9}>
                  <Heading variant="h2" component="h1" mb={2}>
                    {authorResponse.data.name}
                  </Heading>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      maxWidth: '60%',
                      my: 2,
                      lineHeight: '140%',
                    }}
                  >
                    {authorResponse.data.bio}
                  </Typography>
                  {isAdmin && (
                    <Box>
                      <Link to={`/authors/${id}/edit`}>
                        <Button startIcon={<EditOutlined />}>
                          Edit author
                        </Button>
                      </Link>
                      <Button
                        startIcon={<DeleteOutlined />}
                        color="error"
                        onClick={() => setIsDialogOpen(true)}
                        sx={{ ml: 2 }}
                      >
                        Delete author
                      </Button>
                    </Box>
                  )}
                </Grid>
              </Grid>
              <BooksBy author={authorResponse.data} />
              <ConfirmDestructiveAction
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                cancelBtnText="Oh no, take me back"
                confirmBtnText="Delete"
                onConfirm={handleDelete}
                heading={`Delete author ${authorResponse.data.name}?`}
                {...(authorResponse.data.booksCount > 0 && {
                  description: `${authorResponse.data.booksCount} ${pluralize(
                    'book',
                    authorResponse.data.booksCount
                  )} will lose the link to it.`,
                })}
              />
            </Box>
          </Fade>
        </Container>
      )}
    </Box>
  );
}
