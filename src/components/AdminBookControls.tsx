import { DeleteOutlined } from '@mui/icons-material';
import { Box, BoxProps, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteBookMutation } from '../api/library';
import useAuth from '../hooks/useAuth';
import useToaster from '../hooks/useToaster';
import { BookType } from '../types/books';
import ConfirmDestructiveAction from './ConfirmDestuctiveAction';

type Props = {
  book: BookType;
} & BoxProps;

const DeleteBookBtn = ({
  book,
  accessToken,
}: {
  book: BookType;
  accessToken: string;
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showInfoMessage, showErrorMessage } = useToaster();
  const navigate = useNavigate();
  const [deleteBook] = useDeleteBookMutation();
  const openAlert = () => setIsAlertOpen(true);
  const closeAlert = () => setIsAlertOpen(false);

  const onDeleteSuccess = () => {};

  return (
    <>
      <Button
        onClick={openAlert}
        disabled={isLoading}
        startIcon={
          isLoading ? <CircularProgress size={24} /> : <DeleteOutlined />
        }
        color="error"
      >
        Delete book
      </Button>
      <ConfirmDestructiveAction
        open={isAlertOpen}
        onClose={closeAlert}
        onConfirm={console.log}
        heading="Are you sure you want to delete this book?"
        cancelBtnText="Cancel"
        confirmBtnText="Yep, delete it"
      />
    </>
  );
};

const EditBookBtn = {};

export default function AdminBookControls({ book, ...boxProps }: Props) {
  const { isAdmin, jwt } = useAuth();

  return (
    <Box {...boxProps}>
      {isAdmin && <DeleteBookBtn book={book} accessToken={jwt || ''} />}
    </Box>
  );
}
