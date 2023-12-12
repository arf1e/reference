import { Box, Fade, Grid, Skeleton, Typography, useTheme } from '@mui/material';
import pluralize from 'pluralize';
import { Link } from 'react-router-dom';
import { GenreType } from '../types/genres';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import composeHoverBackgroundColor from '../utils/composeHoverBackgroundColor';

type Props = {
  genre: GenreType;
};

export default function GenreCard({ genre }: Props) {
  const theme = useTheme();
  return (
    <Grid item xs={6} md={4} lg={3}>
      <Link to={`/genres/${genre._id}`} style={{ textDecoration: 'none' }}>
        <Box
          sx={{
            backgroundColor: composeBackgroundColor(theme, 1),
            p: 2,
            color: theme.palette.text.primary,
            borderRadius: 2,
            transition: '0.3s',
            '&:hover': {
              backgroundColor: composeHoverBackgroundColor(theme, 1),
              transform: 'scale(1.01)',
            },
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            {genre.title}
          </Typography>
          {genre.booksCount > 0 && (
            <Typography variant="body2">
              {genre.booksCount} {pluralize('book', genre.booksCount)}
            </Typography>
          )}
        </Box>
      </Link>
    </Grid>
  );
}

export const GenreCardSkeleton = () => {
  const theme = useTheme();
  return (
    <Grid item xs={6} sm={4} md={3} lg={2}>
      <Fade in={true} timeout={240}>
        <Box
          sx={{
            backgroundColor: composeBackgroundColor(theme, 1),
            p: 1,
            borderRadius: 1,
          }}
        >
          <Skeleton variant="text" width="80%" sx={{ mb: 2 }} />
          <Skeleton variant="text" width="60%" />
        </Box>
      </Fade>
    </Grid>
  );
};
