import { FileUploadOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { ChangeEventHandler, useRef } from "react";

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const UploadInvoiceButton: React.FC<Props> = (props) => {
  const { onChange } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        sx={{ marginTop: 2, marginLeft: "auto" }}
        variant="contained"
        size="small"
        onClick={() => inputRef?.current?.click()}
      >
        <FileUploadOutlined sx={{ marginRight: 1 }} />
        <input
          ref={inputRef}
          style={{ display: "none" }}
          type="file"
          hidden
          onChange={onChange}
          name="[licenseFile]"
        />
        Upload invoice
      </Button>
    </>
  );
};

export default UploadInvoiceButton;
