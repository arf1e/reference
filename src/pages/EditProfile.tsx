import { Box, CircularProgress, Zoom } from '@mui/material';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserByIdQuery, useUpdateUserByIdMutation } from '../api/library';
import DisplayError from '../components/DisplayError';
import FormPage from '../components/FormPage';
import UserForm from '../components/UserForm';
import useAuth from '../hooks/useAuth';
import useOwnership from '../hooks/useOwnership';

const STATE_LOADING = 'LOADING';
const STATE_GRANTED = 'GRANTED';
const STATE_FORBIDDEN = 'FORBIDDEN';

type PageState =
  | typeof STATE_LOADING
  | typeof STATE_GRANTED
  | typeof STATE_FORBIDDEN;

export default function EditProfile() {
  const [state, setState] = useState<PageState>(STATE_LOADING);
  const { id } = useParams<{ id: string }>() as { id: string };
  const { isLoading, isAdmin, jwt } = useAuth();
  const isOwn = useOwnership(id);
  const navigate = useNavigate();
  const {
    data: userResponse,
    isError,
    error,
  } = useGetUserByIdQuery({
    accessToken: jwt || '',
    id,
  });

  useEffect(() => {
    if (isLoading) {
      setState(STATE_LOADING);
      return;
    }

    if (isAdmin || isOwn) {
      setState(STATE_GRANTED);
      return;
    }

    setState(STATE_FORBIDDEN);
    navigate('/me');
  }, [isLoading, setState, isAdmin, isOwn, navigate]);

  const [updateProfile] = useUpdateUserByIdMutation();

  return (
    <>
      {state === STATE_LOADING && <CircularProgress size={48} />}
      {state === STATE_GRANTED && (
        <>
          {!isError && userResponse?.data && (
            <FormPage title="Edit Profile">
              <UserForm
                providedValues={userResponse?.data}
                successMessage="Profile updated!"
                submitFn={(values) =>
                  updateProfile({
                    accessToken: jwt || '',
                    id,
                    body: values,
                  })
                }
              />
            </FormPage>
          )}
          {isError && (
            <Zoom in={true}>
              <Box>
                <DisplayError
                  title={
                    _.get(error, 'status')
                      ? `Error ${_.get(error, 'status')}`
                      : `Uh oh...`
                  }
                  description="Something went wrong when we tried to reach the provided user's data.
                  Probably we've messed something up."
                  my={8}
                  redirectTo={isOwn ? '/me' : '/'}
                />
              </Box>
            </Zoom>
          )}
        </>
      )}
    </>
  );
}
