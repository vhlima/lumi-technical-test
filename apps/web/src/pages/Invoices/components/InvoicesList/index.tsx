import { useEffect, useState } from "react";
import { Invoice } from "../../../../interfaces";
import { ListInvoicesService } from "../../../../services";
import {
  Box,
  CircularProgress,
  List,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import InvoiceItem from "../../../../components/InvoiceItem";

const InvoicesList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(-1);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const listInvoicesService = new ListInvoicesService();
      const invoicesResponse = await listInvoicesService.execute();
      setInvoices(invoicesResponse);
      setLoading(false);
    })();
  }, []);

  if (loading || invoices.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        {loading && <CircularProgress />}
        {!loading && invoices.length === 0 && (
          <Typography>No invoice was found.</Typography>
        )}
      </Box>
    );
  }

  const installments = new Set(
    invoices.map((invoice) => invoice.installationNumber)
  );

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={(_, value) => setSelectedTab(value)}
        >
          <Tab label="All installments" value={-1} />
          {Array.from(installments).map((installment) => (
            <Tab
              key={`installment-tab-${installment}`}
              label={String(installment)}
              value={installment}
            />
          ))}
        </Tabs>
      </Box>

      <List disablePadding>
        {(selectedTab === -1
          ? invoices
          : invoices.filter(
              (invoice) => invoice.installationNumber === selectedTab
            )
        ).map((invoice) => (
          <InvoiceItem
            key={`invoice-item-${invoice.id}`}
            hideInstallationNumber={selectedTab !== -1}
            {...invoice}
          />
        ))}
      </List>
    </>
  );
};

export default InvoicesList;
