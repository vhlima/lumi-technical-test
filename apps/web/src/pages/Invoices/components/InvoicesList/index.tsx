import { useEffect, useState } from "react";
import { Invoice } from "../../../../interfaces";
import { ListInvoicesService } from "../../../../services";
import { Box, CircularProgress, List, Typography } from "@mui/material";
import InvoiceItem from "../../../../components/InvoiceItem";
import { useAddress } from "../../../../hooks/useAddress";

const InvoicesList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { address } = useAddress();

  useEffect(() => {
    (async () => {
      if (!address) {
        return;
      }

      setLoading(true);
      const listInvoicesService = new ListInvoicesService();
      const invoicesResponse = await listInvoicesService.execute(address.id);
      setInvoices(invoicesResponse);
      setLoading(false);
    })();
  }, [address]);

  return (
    <Box>
      {loading && <CircularProgress />}

      {!loading &&
        (invoices.length === 0 ? (
          <Typography>No invoice was found.</Typography>
        ) : (
          <List disablePadding>
            {invoices.map((invoice) => (
              <InvoiceItem key={`invoice-item-${invoice.id}`} {...invoice} />
            ))}
          </List>
        ))}
    </Box>
  );
};

export default InvoicesList;
