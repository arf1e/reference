import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => any;
  heading: string;
  description?: string;
  cancelBtnText: string;
  confirmBtnText: string;
};

export default function ConfirmDestructiveAction({
  open,
  onClose,
  onConfirm,
  heading,
  description,
  cancelBtnText,
  confirmBtnText,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{heading}</DialogTitle>
      {description && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onClose}>{cancelBtnText}</Button>
        <Button onClick={onConfirm} color="error">
          {confirmBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
