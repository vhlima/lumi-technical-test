import { Button } from "@mui/material";
import { useState } from "react";
import ClientSelectorDialog from "./components/ClientSelectorDialog";

const ClientSelector: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <ClientSelectorDialog open={open} onClose={() => setOpen(false)} />
      <Button sx={{ marginLeft: { md: "auto" } }} onClick={() => setOpen(true)}>
        Switch account
      </Button>
    </>
  );
};

export default ClientSelector;
