import { Box, Fade, Grid, Skeleton, Typography, useTheme } from '@mui/material';
import pluralize from 'pluralize';
import { Link } from 'react-router-dom';
import { AuthorType } from '../types/authors';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import composeHoverBackgroundColor from '../utils/composeHoverBackgroundColor';

type Props = {
  author: AuthorType;
};

export default function AuthorCard({ author }: Props) {
  const theme = useTheme();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Link to={`/authors/${author._id}`} style={{ textDecoration: 'none' }}>
        <Box
          sx={{
            backgroundColor: composeBackgroundColor(theme, 1),
            p: 2,
            color: theme.palette.text.primary,
            borderRadius: 1,
            transition: '0.3s',
            '&:hover': {
              backgroundColor: composeHoverBackgroundColor(theme, 1),
            },
            '&:hover .img-container': {
              transform: 'scale(1.1)',
            },
            '&:hover .info-container': {
              transform: 'translateY(4px)',
            },
          }}
        >
          <Box
            className="img-container"
            sx={{
              width: 80,
              height: 80,
              transition: '0.3s',
              backgroundColor: composeBackgroundColor(theme, 2),
              borderRadius: '50%',
              mb: 2,
            }}
          >
            <img
              src={author.image}
              alt={author.name}
              width="100%"
              height="100%"
              style={{ borderRadius: '50%', objectFit: 'contain' }}
            />
          </Box>
          <Box className="info-container" sx={{ transition: '0.3s' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              {author.name}
            </Typography>
            {author.booksCount > 0 && (
              <Typography
                variant="body2"
                sx={{ color: theme.palette.grey[500] }}
              >
                {author.booksCount} {pluralize('book', author.booksCount)}
              </Typography>
            )}
          </Box>
        </Box>
      </Link>
    </Grid>
  );
}

export const AuthorCardSkeleton = () => {
  const theme = useTheme();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Fade in={true}>
        <Box
          sx={{
            backgroundColor: composeBackgroundColor(theme, 1),
            p: 2,
            color: theme.palette.text.primary,
            borderRadius: 1,
          }}
        >
          <Skeleton variant="circular" width={80} height={80} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="80%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="50%" height={20} />
        </Box>
      </Fade>
    </Grid>
  );
};
