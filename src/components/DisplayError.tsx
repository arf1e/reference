import { ChevronRight } from '@mui/icons-material';
import {
  Box,
  BoxProps,
  Button,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Heading from '../styles/styled/Heading';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import Meta from './Meta';

type Props = {
  title: string;
  description?: string;
  errorOutput?: any;
  redirectTo?: string;
} & BoxProps;

export default function DisplayErroy({
  title,
  description,
  errorOutput,
  redirectTo,
  ...boxProps
}: Props) {
  const theme = useTheme();
  return (
    <Box {...boxProps}>
      <Meta pageTitle="Error" />
      <Container>
        <Heading variant="h2" component="h1">
          {title}
        </Heading>
        <Typography variant="body1" mt={4} mb={2} sx={{ maxWidth: '50%' }}>
          {description}
        </Typography>
        {errorOutput && (
          <Typography
            component="pre"
            sx={{
              backgroundColor: composeBackgroundColor(theme, 1),
              padding: 2,
            }}
          >
            {JSON.stringify(errorOutput, undefined, 2)}
          </Typography>
        )}
        {redirectTo && (
          <Link to={redirectTo}>
            <Button variant="contained" endIcon={<ChevronRight />}>
              Take me out of this place
            </Button>
          </Link>
        )}
      </Container>
    </Box>
  );
}
