import { List, Typography } from "@mui/material";
import InvoiceItem from "../../../../../../components/InvoiceItem";
import { useInvoiceList } from "../../../../hooks/useInvoiceList";

const LatestInvoicesList: React.FC = () => {
  const { invoices } = useInvoiceList();

  const latestInvoices = invoices
    .sort(
      (i1, i2) =>
        new Date(i2.relativeTo).getTime() - new Date(i1.relativeTo).getTime()
    )
    .slice(0, 3);

  if (latestInvoices.length === 0) {
    return (
      <Typography sx={{ marginTop: 2, textAlign: "center" }}>
        No invoice was found.
      </Typography>
    );
  }

  return (
    <List disablePadding>
      {latestInvoices.map((invoice) => (
        <InvoiceItem key={`invoice-${invoice.id}`} {...invoice} />
      ))}
    </List>
  );
};

export default LatestInvoicesList;
