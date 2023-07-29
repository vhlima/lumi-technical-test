import UploadInvoiceContent from "./components/UploadInvoiceContent";
import Section from "../Section";

const UploadInvoiceSection: React.FC = () => {
  return (
    <Section.Root>
      <Section.Title title="Upload Invoice" />

      <UploadInvoiceContent />
    </Section.Root>
  );
};

export default UploadInvoiceSection;
