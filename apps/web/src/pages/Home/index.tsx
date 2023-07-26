import { Box, Button, Divider, Typography } from "@mui/material";
import Layout from "../../layout";

import InfoCardList from "./components/InfoCardList";
import LatestInvoicesList from "./components/LatestInvoicesList";
import UploadInvoice from "./components/UploadInvoice";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <InfoCardList />

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>Upload Invoice</Typography>
        <Divider />

        <UploadInvoice />
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h5" gutterBottom>Latest Invoices</Typography>
          <Button sx={{ marginLeft: "auto" }} href="/invoices">View all</Button>
        </Box>

        <Divider />

        <LatestInvoicesList />
      </Box>
    </Layout>
  );
};

export default HomePage;
