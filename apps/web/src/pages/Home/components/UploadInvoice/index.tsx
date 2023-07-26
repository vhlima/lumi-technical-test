import { ChangeEvent, useState } from "react";
import UploadInvoiceButton from "./components/UploadInvoiceButton";
import { CreateInvoiceService } from "../../../../services";
import { Typography } from "@mui/material";

const UploadInvoice: React.FC = (props) => {
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

export default UploadInvoice;
