import { Box, Divider, Typography } from "@mui/material";
import Layout from "../../layout";

import InfoCardList from "./components/InfoCardList";
import LatestInvoicesList from "./components/LatestInvoicesList";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <InfoCardList />

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Latest Invoices
        </Typography>
        <Divider />
        <LatestInvoicesList />
      </Box>
    </Layout>
  );
};

export default HomePage;
