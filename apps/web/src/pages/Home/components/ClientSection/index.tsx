import SectionHeader from "../SectionHeader";
import { useSession } from "../../../../hooks/useSession";
import ClientSelector from "../ClientSelector";
import InfoCardList from "../InfoCardList";

const ClientSection: React.FC = () => {
  const { client: session } = useSession();

  return (
    <SectionHeader
      title={
        session
          ? `Welcome, ${session.fullName}`
          : `Welcome! Please upload your first invoice to register`
      }
      header={<ClientSelector />}
    >
      <InfoCardList />
    </SectionHeader>
  );
};

export default ClientSection;
