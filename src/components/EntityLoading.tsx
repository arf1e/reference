import {
  Box,
  BoxProps,
  CircularProgress,
  Container,
  Fade,
} from '@mui/material';

type Props = {} & BoxProps;

export default function EntityLoading({ ...boxProps }: Props) {
  return (
    <Container>
      <Fade in={true}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="40vh"
          {...boxProps}
        >
          <CircularProgress size="4rem" />
        </Box>
      </Fade>
    </Container>
  );
}
