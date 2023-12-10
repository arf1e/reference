import { DeleteOutline } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

type Props = {
  url: string;
  size: number;
  onRemove: () => void;
};

export default function ImagePreview({ url, size, onRemove }: Props) {
  return (
    <Box sx={{ width: size, height: size, position: 'relative' }}>
      <img
        src={url}
        alt="avatar"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
      <IconButton
        onClick={onRemove}
        sx={{ position: 'absolute', top: -12, right: -12 }}
      >
        <DeleteOutline />
      </IconButton>
    </Box>
  );
}
