import { useSession } from "../../../../hooks/useSession";
import InfoCardList from "./components/InfoCardList";
import Section from "../Section";

const ClientSection: React.FC = () => {
  const { client: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <Section.Content>
      <Section.Title
        title={`Welcome ${session.fullName}`}
        description="Here you can find out more about your expenses and invoices uploaded
          to our system."
      />

      <Section.Content>
        <InfoCardList />
      </Section.Content>
    </Section.Content>
  );
};

export default ClientSection;
