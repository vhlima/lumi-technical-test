import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import Layout from "../../layout";

import LatestInvoicesList from "./components/LatestInvoicesList";
import UploadInvoice from "./components/UploadInvoice";
import ConsumptionChart from "./components/ConsumptionChart";
import ClientSection from "./components/ClientSection";
import { useSession } from "../../hooks/useSession";
import UnauthSection from "./components/UnauthSection";
import ClientSelector from "./components/ClientSelector";
import InfoCardList from "./components/InfoCardList";

const HomePage: React.FC = () => {
  const { client: session } = useSession();

  return (
    <Layout>
      {session ? (
        <>
          <ClientSection />
          <InfoCardList />
        </>
      ) : (
        <UnauthSection />
      )}

      <Box sx={{ marginTop: 4 }}>
        <Stack direction={{ md: "row" }} sx={{ alignItems: "center" }}>
          <Typography variant="h5" gutterBottom>
            Upload Invoice
          </Typography>

          <ClientSelector />
        </Stack>

        <Divider />

        <UploadInvoice />
      </Box>

      {session && (
        <>
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h5" gutterBottom>
              Consumption Chart (kWH)
            </Typography>
            <Divider />

            <ConsumptionChart />
          </Box>

          <Box sx={{ marginTop: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5" gutterBottom>
                Latest Invoices
              </Typography>
              <Button sx={{ marginLeft: "auto" }} href="/invoices">
                View all
              </Button>
            </Box>

            <Divider />

            <LatestInvoicesList />
          </Box>
        </>
      )}
    </Layout>
  );
};

export default HomePage;
