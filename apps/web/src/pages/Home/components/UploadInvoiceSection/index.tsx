import UploadInvoiceContent from "./components/UploadInvoiceContent";
import ClientSelector from "../ClientSelector";
import Section from "../Section";

const UploadInvoiceSection: React.FC = () => {
  return (
    <Section.Root>
      <Section.Title
        sx={{ display: "flex", alignItems: "center" }}
        title="Upload Invoice"
      >
        <ClientSelector />
      </Section.Title>

      <UploadInvoiceContent />
    </Section.Root>
  );
};

export default UploadInvoiceSection;
