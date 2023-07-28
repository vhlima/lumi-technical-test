import { useSession } from "../../../../hooks/useSession";
import InfoCardList from "./components/InfoCardList";
import Section from "../Section";
import { Divider } from "@mui/material";
import AddressSelect from "../../../../components/AddressSelect";

const ClientSection: React.FC = () => {
  const { client: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <Section.Root>
      <Section.Title
        title={`Welcome ${session.fullName}`}
        description="Here you can find out more about your expenses and invoices uploaded
          to our system."
      />

      <AddressSelect />

      <Divider />

      <Section.Content>
        <InfoCardList />
      </Section.Content>
    </Section.Root>
  );
};

export default ClientSection;
