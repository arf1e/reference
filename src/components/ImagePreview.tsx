import { DeleteOutline } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

type Props = {
  file: File;
  size: number;
  onRemove: () => void;
};

export default function ImagePreview({ file, size, onRemove }: Props) {
  return (
    <Box sx={{ width: size, height: size, position: 'relative' }}>
      <img
        src={URL.createObjectURL(file)}
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
