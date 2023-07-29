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
  emptyText?: string;
  onClose: () => void;
}

const Selector: React.FC<PropsWithChildren<Props>> = (props) => {
  const { title, open, emptyText, children, onClose, ...rest } = props;

  return (
    <Dialog onClose={onClose} open={open} {...rest}>
      <DialogTitle data-testid="selector-title">
        {title}
        <IconButton
          size="large"
          sx={{ marginLeft: 2, color: "warning.main" }}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      {!!emptyText ? (
        <DialogContent>
          <Typography data-testid="selector-empty">{emptyText}</Typography>
        </DialogContent>
      ) : (
        <List sx={{ pt: 0 }} data-testid="selector-list">{children}</List>
      )}
    </Dialog>
  );
};

export default Selector;
