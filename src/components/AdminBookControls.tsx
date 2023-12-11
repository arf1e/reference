import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { Box, BoxProps, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteBookMutation } from '../api/library';
import useAuth from '../hooks/useAuth';
import useToaster from '../hooks/useToaster';
import { BookType } from '../types/books';
import handleAsyncOperation from '../utils/handleAsyncOperation';
import ConfirmDestructiveAction from './ConfirmDestuctiveAction';
import LoadingButton from './LoadingButton';

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

  const onDeleteSuccess = () => {
    setIsLoading(false);
    showInfoMessage(`"${book.title}" has been deleted`);
    navigate('/');
  };

  const handleBookDelete = () =>
    handleAsyncOperation(
      () => deleteBook({ accessToken, isbn: book.isbn, id: book._id }),
      {
        onSuccess: onDeleteSuccess,
        onError: showErrorMessage,
        expectEmptyResponse: true,
      }
    );

  return (
    <>
      <LoadingButton
        loading={isLoading}
        onClick={openAlert}
        startIcon={<DeleteOutlined />}
        color="error"
      >
        Delete book
      </LoadingButton>
      <ConfirmDestructiveAction
        open={isAlertOpen}
        onClose={closeAlert}
        onConfirm={handleBookDelete}
        heading="Are you sure you want to delete this book?"
        cancelBtnText="Cancel"
        confirmBtnText="Yep, delete it"
      />
    </>
  );
};

const EditBookBtn = ({ book }: { book: BookType }) => {
  return (
    <Link to={`/books/${book.isbn}/edit`}>
      <Button startIcon={<EditOutlined />}>Edit Book</Button>
    </Link>
  );
};

export default function AdminBookControls({ book, ...boxProps }: Props) {
  const { isAdmin, jwt } = useAuth();

  if (!isAdmin) {
    return null;
  }

  return (
    <Box display="flex" gap={2} {...boxProps}>
      <DeleteBookBtn book={book} accessToken={jwt || ''} />
      <EditBookBtn book={book} />
    </Box>
  );
}
