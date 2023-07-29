import { ChangeEvent, useState } from "react";
import UploadInvoiceButton from "../UploadInvoiceButton";
import { CreateInvoiceService } from "../../../../../../services";
import { Typography } from "@mui/material";
import { useSession } from "../../../../../../hooks/useSession";
import { useInvoiceList } from "../../../../hooks/useInvoiceList";

const UploadInvoiceContent: React.FC = (props) => {
  const { client: session, signIn } = useSession();

  const { setInvoices } = useInvoiceList();

  const [uploadMessage, setUploadMessage] = useState<string>();

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      setUploadMessage('Loading...');

      const createInvoiceService = new CreateInvoiceService();
      const invoice = await createInvoiceService.execute(file, session?.id);

      if (invoice) {
        if (!session) {
          signIn(invoice.client);
        }

        setInvoices((invoices) => [...invoices, invoice]);
        setUploadMessage(`Invoice #${invoice.id} loaded with success.`);
      }
    } catch (err) {
      setUploadMessage((err as Error).message);
    }
  };

  return (
    <>
      {uploadMessage && (
        <Typography sx={{ marginTop: 2 }}>{uploadMessage}</Typography>
      )}
      <UploadInvoiceButton onChange={(e) => handleUpload(e)} />
    </>
  );
};

export default UploadInvoiceContent;
