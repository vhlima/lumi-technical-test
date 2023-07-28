import { CircularProgress, Divider, Typography } from "@mui/material";
import Layout from "../../layout";
import InvoicesList from "./components/InvoicesList";
import { Navigate } from "react-router-dom";
import AddressSelect from "../../components/AddressSelect";
import { useSession } from "../../hooks/useSession";

const InvoicesPage: React.FC = () => {
  const { client: session } = useSession();

  /* Poor implementation of protected route */
  const clientId = localStorage.getItem("client-id");

  if (!clientId) {
    return <Navigate to="/" replace />;
  }

  if (!session) {
    return (
      <Layout>
        <CircularProgress />
      </Layout>
    );
  }

  return (
    <Layout>
      <Typography variant="h5" gutterBottom>
        Invoices
      </Typography>
      <Divider />

      <AddressSelect />
      <Divider />

      <InvoicesList />
    </Layout>
  );
};

export default InvoicesPage;
