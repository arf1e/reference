import { Box, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMyProfileQuery } from '../api/library';
import Meta from '../components/Meta';
import ProfileInfo from '../components/ProfileInfo';
import { RootState } from '../slices';
import { selectJwt } from '../slices/authSlice';

export default function Me() {
  const accessToken = useSelector((state: RootState) => selectJwt(state.auth));
  const { data: profileData, isLoading } = useGetMyProfileQuery(
    accessToken as string
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!profileData) {
    return <p>Profile not found</p>;
  }

  return (
    <Box>
      <Container>
        <Meta pageTitle={profileData.data.firstName} />
        <ProfileInfo user={profileData.data} />
      </Container>
    </Box>
  );
}
