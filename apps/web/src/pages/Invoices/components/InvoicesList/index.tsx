import { useEffect, useState } from "react";
import { Invoice } from "../../../../interfaces";
import { ListInvoicesService } from "../../../../services";
import { Box, CircularProgress, List, Typography } from "@mui/material";
import InvoiceItem from "../../../../components/InvoiceItem";
import { useSession } from "../../../../hooks/useSession";
import ClientAddressesSelect from "../../../../components/ClientAddressesSelect";

const InvoicesList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("");

  const { client: session } = useSession();

  useEffect(() => {
    (async () => {
      if (!session) {
        return;
      }

      setLoading(true);
      const listInvoicesService = new ListInvoicesService();
      const invoicesResponse = await listInvoicesService.execute(session.id);
      setInvoices(invoicesResponse);
      setLoading(false);
    })();
  }, [session]);

  const filteredInvoices = !selectedTab
    ? invoices
    : invoices.filter(
        (invoice) => invoice.address.streetAddress === selectedTab
      );

  return (
    <Box>
      <ClientAddressesSelect
        id="installmentFilter"
        sx={{ marginBottom: 2, marginTop: 2 }}
        label="Filter by Installment"
        value={selectedTab}
        onChange={(value) => setSelectedTab(value ? value : "")}
      />

      {loading && <CircularProgress />}

      {!loading &&
        (filteredInvoices.length === 0 ? (
          <Typography>No invoice was found.</Typography>
        ) : (
          <List disablePadding>
            {filteredInvoices.map((invoice) => (
              <InvoiceItem
                key={`invoice-item-${invoice.id}`}
                hideAddress={!!selectedTab}
                {...invoice}
              />
            ))}
          </List>
        ))}
    </Box>
  );
};

export default InvoicesList;
