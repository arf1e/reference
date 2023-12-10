import { ImageOutlined } from '@mui/icons-material';
import { BoxProps, Button } from '@mui/material';
import FileInputContainer from '../styles/styled/FileInputContainer';

type Props = {
  label: string;
  name: string;
  onFile: (file: File) => void;
  icon?: React.ReactNode;
  accept?: string;
} & BoxProps;

const regularImageMimeTypes = ['image/jpeg', 'image/png'];

export default function FileInput({
  label,
  name,
  onFile,
  icon = <ImageOutlined />,
  accept = regularImageMimeTypes.join(', '),
  ...boxProps
}: Props) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFile(file);
    }
  };
  return (
    <FileInputContainer {...boxProps}>
      <Button variant="text" component="label" startIcon={icon}>
        <input
          type="file"
          name={name}
          className="input"
          accept={accept}
          onChange={handleFileChange}
        />
        {label}
      </Button>
    </FileInputContainer>
  );
}
