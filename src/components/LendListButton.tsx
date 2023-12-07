import { ListOutlined } from '@mui/icons-material';
import { IconButton, useTheme } from '@mui/material';

export default function LendListButton() {
  const theme = useTheme();
  return (
    <IconButton onClick={console.log}>
      <ListOutlined sx={{ color: theme.palette.primary.main }} />
    </IconButton>
  );
}
