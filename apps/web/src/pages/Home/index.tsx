import Layout from "../../layout";

import UploadInvoiceSection from "./components/UploadInvoiceSection";
import ConsumptionSection from "./components/ConsumptionSection";
import ClientSection from "./components/ClientSection";
import { useSession } from "../../hooks/useSession";
import UnauthSection from "./components/UnauthSection";
import LatestInvoicesSection from "./components/LatestInvoicesSection";

const HomePage: React.FC = () => {
  const { client: session } = useSession();

  return (
    <Layout>
      {session ? <ClientSection /> : <UnauthSection />}

      <UploadInvoiceSection />

      {session && (
        <>
          <ConsumptionSection />

          <LatestInvoicesSection />
        </>
      )}
    </Layout>
  );
};

export default HomePage;
