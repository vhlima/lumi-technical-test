import { ExpandMore, ExpandLess, Receipt } from "@mui/icons-material";
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { Invoice } from "../../interfaces";
import { useState } from "react";
import InvoiceExpensesList from "./components/InvoiceExpensesList";

type Props = Invoice;

const InvoiceItem: React.FC<Props> = (props) => {
  const { installationNumber, price, expiresAt, relativeTo, expenses } = props;

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <ListItemButton divider onClick={() => setOpen((prev) => !prev)}>
        <ListItemIcon>
          <Receipt fontSize="large" />
        </ListItemIcon>
        <ListItemText
          primary={`${format(
            new Date(relativeTo),
            "MMMM/yyyy"
          )} (${installationNumber})`}
          secondary={
            <>
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="body2"
              >{`Price: R$ ${price}`}</Typography>
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="body2"
              >{`Expires at: ${format(
                new Date(expiresAt),
                "MMMM dd, yyyy"
              )}`}</Typography>
            </>
          }
        />

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <InvoiceExpensesList expenses={expenses} />
      </Collapse>
    </>
  );
};

export default InvoiceItem;
