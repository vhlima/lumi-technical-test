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
        <Typography>No invoice was found.</Typography>
      ) : (
        <List disablePadding>
          {invoices.map((invoice) => (
            <InvoiceItem key={`invoice-item-${invoice.id}`} {...invoice} />
          ))}
        </List>
      )}
    </Box>
  );
};

export default InvoicesList;
