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
import { parseToBRL } from "../../utils/currency-parser";

type Props = Invoice;

const InvoiceItem: React.FC<Props> = (props) => {
  const { price, expiresAt, relativeYear, relativeMonth, expenses } = props;

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <ListItemButton
        divider
        onClick={() => setOpen((prev) => !prev)}
        data-testid="invoice-item-button"
      >
        <ListItemIcon sx={{ color: "grey.600" }}>
          <Receipt fontSize="large" />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              sx={{ color: "text.primary" }}
              data-testid="invoice-item-title"
            >
              {format(new Date(relativeYear, relativeMonth), "MMMM/yyyy")}
            </Typography>
          }
          secondary={
            <>
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="body2"
              >
                {`Price: `}
                <span data-testid="invoice-item-price">{parseToBRL(price)}</span>
              </Typography>
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="body2"
              >
                {`Expires at: `}
                <span data-testid="invoice-item-expiration">{format(new Date(expiresAt), "MMMM dd, yyyy")}</span>
              </Typography>
            </>
          }
        />

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        data-testid="invoice-item-collapse"
      >
        <InvoiceExpensesList expenses={expenses} />
      </Collapse>
    </>
  );
};

export default InvoiceItem;
