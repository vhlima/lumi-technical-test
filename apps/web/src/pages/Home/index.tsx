import { Button } from "@mui/material";
import Layout from "../../layout";

import LatestInvoicesList from "./components/LatestInvoicesList";
import UploadInvoiceSection from "./components/UploadInvoiceSection";
import ConsumptionSection from "./components/ConsumptionSection";
import ClientSection from "./components/ClientSection";
import { useSession } from "../../hooks/useSession";
import UnauthSection from "./components/UnauthSection";
import Section from "./components/Section";

const HomePage: React.FC = () => {
  const { client: session } = useSession();

  return (
    <Layout>
      {session ? <ClientSection /> : <UnauthSection />}

      <UploadInvoiceSection />

      {session && (
        <>
          <ConsumptionSection />

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
