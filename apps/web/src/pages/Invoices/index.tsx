import { Divider, Typography } from "@mui/material";
import Layout from "../../layout";
import InvoicesList from "./components/InvoicesList";

const InvoicesPage: React.FC = () => {
  return (
    <Layout>
      <Typography variant="h5" gutterBottom>
        Invoices
      </Typography>
      <Divider />

      <InvoicesList />
    </Layout>
  );
};

export default InvoicesPage;
