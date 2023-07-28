import Layout from "../../layout";

import UploadInvoiceSection from "./components/UploadInvoiceSection";
import ConsumptionSection from "./components/ConsumptionSection";
import ClientSection from "./components/ClientSection";
import { useSession } from "../../hooks/useSession";
import UnauthSection from "./components/UnauthSection";
import LatestInvoicesSection from "./components/LatestInvoicesSection";
import { InvoiceListProvider } from "./hooks/useInvoiceList";

const HomePage: React.FC = () => {
  const { client: session } = useSession();

  return (
    <Layout>
      <InvoiceListProvider>
        {session ? <ClientSection /> : <UnauthSection />}

        <UploadInvoiceSection />

        {session && (
          <>
            <ConsumptionSection />

            <LatestInvoicesSection />
          </>
        )}
      </InvoiceListProvider>
    </Layout>
  );
};

export default HomePage;
