import { AddOutlined, ChevronRightOutlined } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllAuthorsQuery } from '../api/library';
import useAuth from '../hooks/useAuth';
import AuthorCard, { AuthorCardSkeleton } from './AuthorCard';

const STATE_LOADING = 'LOADING';
const STATE_LIST = 'LIST';
const STATE_EMPTY = 'EMPTY';
const STATE_ERROR = 'ERROR';

type AuthorsState =
  | typeof STATE_LOADING
  | typeof STATE_LIST
  | typeof STATE_EMPTY
  | typeof STATE_ERROR;

const PREVIEW_AUTHORS_AMOUNT = 4;

export default function AuthorPreview() {
  const [state, setState] = useState<AuthorsState>(STATE_LOADING);
  const { isAdmin } = useAuth();

  const {
    data: authorsResponse,
    isFetching,
    isError,
  } = useGetAllAuthorsQuery({
    name: '',
    page: 1,
    limit: PREVIEW_AUTHORS_AMOUNT,
  });

  useEffect(() => {
    if (isFetching) {
      setState(STATE_LOADING);
      return;
    }

    if (isError) {
      setState(STATE_ERROR);
      return;
    }

    if (authorsResponse?.data.authors.length === 0) {
      setState(STATE_EMPTY);
      return;
    }

    setState(STATE_LIST);
  }, [isFetching, isError, authorsResponse?.data.authors.length]);

  const renderSkeletons = () =>
    new Array(PREVIEW_AUTHORS_AMOUNT)
      .fill(null)
      .map((_, index) => <AuthorCardSkeleton key={index} />);

  return (
    <Box my={12}>
      <Container>
        <Typography variant="h4" component="h2" mb={2}>
          Authors
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {isAdmin && (
              <Link to="/authors/new">
                <Button color="primary" endIcon={<AddOutlined />}>
                  Add a new author
                </Button>
              </Link>
            )}
          </Grid>
          {state === STATE_LOADING && renderSkeletons()}
          {state === STATE_LIST &&
            authorsResponse?.data.authors.map((author) => (
              <AuthorCard key={author._id} author={author} />
            ))}
          <Grid item xs={12} display="flex">
            <Link to="/authors">
              <Button endIcon={<ChevronRightOutlined />}>
                View all authors
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
