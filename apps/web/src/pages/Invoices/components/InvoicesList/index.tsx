import { Invoice } from "../../../../interfaces";
import { Box, List, Typography } from "@mui/material";
import InvoiceItem from "../../../../components/InvoiceItem";

interface Props {
  invoices: Invoice[];
}

const InvoicesList: React.FC<Props> = (props) => {
  const { invoices } = props;

  return (
    <Box>
      {invoices.length === 0 ? (
        <Typography data-testid="invoice-list-empty">
          No invoice was found.
        </Typography>
      ) : (
        <List disablePadding data-testid="invoice-list">
          {invoices.map((invoice) => (
            <InvoiceItem key={`invoice-item-${invoice.id}`} {...invoice} />
          ))}
        </List>
      )}
    </Box>
  );
};

export default InvoicesList;
