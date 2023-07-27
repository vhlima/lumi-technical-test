import { ChangeEvent, useState } from "react";
import UploadInvoiceButton from "../UploadInvoiceButton";
import { CreateInvoiceService } from "../../../../../../services";
import { Typography } from "@mui/material";
import { useSession } from "../../../../../../hooks/useSession";

const UploadInvoiceContent: React.FC = (props) => {
  const { client: session, signIn } = useSession();

  const [uploadMessage, setUploadMessage] = useState<string>();

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const createInvoiceService = new CreateInvoiceService();
      const invoice = await createInvoiceService.execute(file);

      if (invoice) {
        if (!session) {
          signIn(invoice.client);
        }

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
