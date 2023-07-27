import { Button } from "@mui/material";

import LatestInvoicesList from "./components/LatestInvoicesList";
import Section from "../Section";

const LatestInvoicesSection: React.FC = () => {
  return (
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
  );
};

export default LatestInvoicesSection;
