import { AddOutlined, ChevronRightOutlined } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllGenresQuery } from '../api/library';
import useAuth from '../hooks/useAuth';
import GenreCard, { GenreCardSkeleton } from './GenreCard';

const STATE_LOADING = 'LOADING';
const STATE_LIST = 'LIST';
const STATE_EMPTY = 'EMPTY';
const STATE_ERROR = 'ERROR';

const PREVIEW_GENRES_AMOUNT = 8;

export default function Collections() {
  const [state, setState] = useState(STATE_LOADING);
  const {
    data: genresResponse,
    isFetching,
    isError,
  } = useGetAllGenresQuery({
    title: '',
    page: 1,
    limit: PREVIEW_GENRES_AMOUNT,
  });
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (isFetching) {
      setState(STATE_LOADING);
      return;
    }

    if (isError) {
      setState(STATE_ERROR);
      return;
    }

    if (genresResponse?.data.genres.length === 0) {
      setState(STATE_EMPTY);
      return;
    }

    setState(STATE_LIST);
  }, [genresResponse?.data.genres.length, isFetching, isError]);

  const renderSkeletons = () => {
    return Array.from(Array(PREVIEW_GENRES_AMOUNT).keys()).map((i) => (
      <GenreCardSkeleton key={i} />
    ));
  };

  return (
    <Box>
      <Container>
        <Box>
          <Typography variant="h4" mb={4}>
            Genres
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {isAdmin && (
                <Link
                  to="/genres/new"
                  style={{ textDecoration: 'none', marginLeft: 'auto' }}
                >
                  <Button endIcon={<AddOutlined />}>Add a new genre</Button>
                </Link>
              )}
            </Grid>
            {state === STATE_LOADING && renderSkeletons()}
            {state === STATE_LIST &&
              genresResponse?.data.genres.map((genre) => (
                <GenreCard key={genre._id} genre={genre} />
              ))}
            <Grid item xs={12} display="flex">
              <Link to="/genres" style={{ textDecoration: 'none' }}>
                <Button endIcon={<ChevronRightOutlined />}>
                  View all genres
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
