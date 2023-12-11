import { ChevronLeft } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import FormPage from '../components/FormPage';
import UpdatePasswordForm from '../components/UpdatePasswordForm';

export default function UpdatePassword() {
  return (
    <FormPage title="Update password">
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-start' }}>
        <Link to="/me">
          <Button startIcon={<ChevronLeft />}>Back to my profile</Button>
        </Link>
      </Box>
      <UpdatePasswordForm />
    </FormPage>
  );
}
