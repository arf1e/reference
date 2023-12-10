import { Chip, ChipOwnProps } from '@mui/material';
import _ from 'lodash';
import { useMemo } from 'react';
import useAuth from '../hooks/useAuth';
import { BookType } from '../types/books';

type Props = {
  book: BookType;
} & ChipOwnProps;

export default function StatusChip({ book, ...chipProps }: Props) {
  const { user } = useAuth();
  const label = useMemo(() => {
    return {
      available: 'Available',
      borrowed: book.borrowerId === user?._id ? 'Borrowed by me' : 'Borrowed',
    }[book.status];
  }, [book, user]);

  const color = useMemo(
    () => (book.status === 'available' ? 'success' : 'error'),
    [book]
  );

  return <Chip {...chipProps} label={label} variant="outlined" color={color} />;
}
