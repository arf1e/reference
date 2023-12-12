import { Chip } from '@mui/material';
import { useMemo } from 'react';
import { useGetAuthorByIdQuery, useGetGenreByIdQuery } from '../api/library';

type Props = {
  onDelete: () => void;
  label: string;
  disabled?: boolean;
};

export default function AutocompleteChip({
  label,
  onDelete,
  disabled = false,
}: Props) {
  return (
    <Chip
      disabled={disabled}
      label={label}
      variant="outlined"
      onDelete={onDelete}
    />
  );
}

export const AuthorAutocompleteChip = ({
  id,
  onDelete,
}: {
  id: string;
  onDelete: () => void;
}) => {
  const {
    data: authorResponse,
    isFetching,
    isError,
  } = useGetAuthorByIdQuery(id);
  const label = useMemo(() => {
    if (isError) {
      return `[Failed to fetch author]`;
    }

    if (authorResponse?.data) {
      return authorResponse.data.name;
    }

    return 'Loading...';
  }, [isError, authorResponse?.data]);
  return (
    <AutocompleteChip label={label} onDelete={onDelete} disabled={isFetching} />
  );
};

export const GenreAutocompleteChip = ({
  id,
  onDelete,
}: {
  id: string;
  onDelete: () => void;
}) => {
  const { data: genreResponse, isFetching, isError } = useGetGenreByIdQuery(id);
  const label = useMemo(() => {
    if (isError) {
      return `[Failed to fetch genre]`;
    }

    if (genreResponse?.data) {
      return genreResponse.data.title;
    }

    return 'Loading...';
  }, [isError, genreResponse?.data]);
  return (
    <AutocompleteChip label={label} onDelete={onDelete} disabled={isFetching} />
  );
};
