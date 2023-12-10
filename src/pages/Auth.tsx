import { Box, Container, Grid } from '@mui/material';
import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import Meta from '../components/Meta';
import SignupForm from '../components/SignupForm';
import Heading from '../styles/styled/Heading';

const LOGIN_FORM = 'login';
const SIGNUP_FORM = 'signup';

type FormType = typeof LOGIN_FORM | typeof SIGNUP_FORM;

export default function Auth() {
  const [displayedForm, setDisplayedForm] = useState<FormType>(LOGIN_FORM);
  return (
    <Box>
      <Meta pageTitle="Auth" />
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, mb: 2 }}>
          <Heading variant="h2" sx={{ alignSelf: 'center', mb: 4 }}>
            – New phone, who dis?
          </Heading>
        </Box>
        <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="center">
          <Grid item sm={6} xs={12}>
            {displayedForm === LOGIN_FORM && (
              <LoginForm switchToSignup={() => setDisplayedForm(SIGNUP_FORM)} />
            )}
            {displayedForm === SIGNUP_FORM && (
              <SignupForm switchToLogin={() => setDisplayedForm(LOGIN_FORM)} />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
