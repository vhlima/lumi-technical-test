import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { PropsWithChildren } from "react";

interface Props {
  title: string;
  open: boolean;
  emptyText?: boolean;
  onClose: () => void;
}

const Selector: React.FC<PropsWithChildren<Props>> = (props) => {
  const { title, open, emptyText, children, onClose } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        {title}
        <IconButton
          size="large"
          sx={{ marginLeft: 2, color: "warning.main" }}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      {emptyText ? (
        <DialogContent>
          <Typography>{emptyText}</Typography>
        </DialogContent>
      ) : (
        <List sx={{ pt: 0 }}>{children}</List>
      )}
    </Dialog>
  );
};

export default Selector;
