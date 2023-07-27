import { Button } from "@mui/material";
import Layout from "../../layout";

import LatestInvoicesList from "./components/LatestInvoicesList";
import UploadInvoice from "./components/UploadInvoice";
import ConsumptionChart from "./components/ConsumptionChart";
import ClientSection from "./components/ClientSection";
import { useSession } from "../../hooks/useSession";
import UnauthSection from "./components/UnauthSection";
import ClientSelector from "./components/ClientSelector";
import Section from "./components/Section";

const HomePage: React.FC = () => {
  const { client: session } = useSession();

  return (
    <Layout>
      {session ? <ClientSection /> : <UnauthSection />}

      <Section.Root>
        <Section.Title
          sx={{ display: "flex", alignItems: "center" }}
          title="Upload Invoice"
        >
          <ClientSelector />
        </Section.Title>

        <UploadInvoice />
      </Section.Root>

      {session && (
        <>
          <Section.Root>
            <Section.Title title="Consumption Chart (kWH)" />

            <Section.Content>
              <ConsumptionChart />
            </Section.Content>
          </Section.Root>

          <Section.Root>
            <Section.Title
              sx={{ display: "flex", alignItems: "center" }}
              title="Latest Invoices"
            >
              <Button sx={{ marginLeft: "auto" }} href="/invoices">
                View all
              </Button>
            </Section.Title>

            <Section.Content disableMargin>
              <LatestInvoicesList />
            </Section.Content>
          </Section.Root>
        </>
      )}
    </Layout>
  );
};

export default HomePage;
