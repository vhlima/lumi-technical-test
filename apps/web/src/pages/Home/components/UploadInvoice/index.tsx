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

    const createInvoiceService = new CreateInvoiceService();
    const invoice = await createInvoiceService.execute(file);

    if (!invoice) {
      setUploadMessage("An error occurred while uploading your invoice.");
    } else {
      setUploadMessage(`Invoice #${invoice.id} loaded with success.`);
    }
  };

  return (
    <>
      {uploadMessage && <Typography sx={{ marginTop: 2 }}>{uploadMessage}</Typography>}
      <UploadInvoiceButton onChange={(e) => handleUpload(e)} />
    </>
  );
};

export default UploadInvoice;
