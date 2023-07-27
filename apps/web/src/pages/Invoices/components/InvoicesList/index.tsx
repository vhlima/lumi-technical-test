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
  const [selectedTab, setSelectedTab] = useState<string>("");

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
    invoices.map((invoice) => invoice.address.streetAddress)
  );

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={(_, value) => setSelectedTab(value)}
        >
          <Tab label="All installments" value={""} />
          {Array.from(installments).map((installment) => (
            <Tab
              key={`installment-tab-${installment}`}
              label={installment}
              value={installment}
            />
          ))}
        </Tabs>
      </Box>

      <List disablePadding>
        {(!selectedTab
          ? invoices
          : invoices.filter(
              (invoice) => invoice.address.streetAddress === selectedTab
            )
        ).map((invoice) => (
          <InvoiceItem
            key={`invoice-item-${invoice.id}`}
            hideAddress={!!selectedTab}
            {...invoice}
          />
        ))}
      </List>
    </>
  );
};

export default InvoicesList;
