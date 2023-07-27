import UploadInvoiceContent from "./components/UploadInvoiceContent";
import ClientSelector from "./components/ClientSelector";
import Section from "../Section";

const UploadInvoiceSection: React.FC = () => {
  return (
    <Section.Root>
      <Section.Title
        sx={{ display: "flex", alignItems: "center" }}
        title="Upload Invoice"
        disableGutter
      >
        <ClientSelector />
      </Section.Title>

      <UploadInvoiceContent />
    </Section.Root>
  );
};

export default UploadInvoiceSection;
