import { Box, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMyProfileQuery } from '../api/library';
import DisplayError from '../components/DisplayError';
import EntityLoading from '../components/EntityLoading';
import Meta from '../components/Meta';
import ProfileInfo from '../components/ProfileInfo';
import { RootState } from '../slices';
import { selectJwt } from '../slices/authSlice';

export default function Me() {
  const accessToken = useSelector((state: RootState) => selectJwt(state.auth));
  const {
    data: profileData,
    isFetching,
    isError,
    error,
  } = useGetMyProfileQuery(accessToken as string);

  return (
    <Box sx={{ mb: 8 }}>
      <Meta pageTitle={profileData?.data.firstName || 'Me'} />
      {isFetching && <EntityLoading />}
      {isError && (
        <DisplayError
          sx={{ my: 8 }}
          title="Failed to fetch the profile."
          errorOutput={error}
          singleEntity
        />
      )}
      {profileData?.data && (
        <Container>
          <Meta pageTitle={profileData.data.firstName} />
          <ProfileInfo user={profileData.data} />
        </Container>
      )}
    </Box>
  );
}
