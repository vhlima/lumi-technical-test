import { useEffect, useState } from "react";
import { Invoice } from "../../../../interfaces";
import { ListLatestInvoicesService } from "../../../../services";
import { Box, CircularProgress, List, Typography } from "@mui/material";
import InvoiceItem from "../../../../components/InvoiceItem";

const LatestInvoicesList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const listLatestInvoicesService = new ListLatestInvoicesService();
      const latestInvoicesResponse = await listLatestInvoicesService.execute();
      setInvoices(latestInvoicesResponse);
      setLoading(false);
    })();
  }, []);

  if (loading || invoices.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {loading && <CircularProgress />}
        {!loading && invoices.length === 0 && (
          <Typography>No invoice was found.</Typography>
        )}
      </Box>
    );
  }

  return (
    <List disablePadding>
      {invoices.map((invoice) => (
        <InvoiceItem key={`invoice-${invoice.id}`} {...invoice} />
      ))}
    </List>
  );
};

export default LatestInvoicesList;
