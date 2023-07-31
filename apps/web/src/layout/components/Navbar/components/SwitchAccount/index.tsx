import { Button } from "@mui/material";
import { useState } from "react";
import ClientSelectorDialog from "./components/AccountSelector";

const AccountSelector: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <ClientSelectorDialog open={open} onClose={() => setOpen(false)} />
      <Button sx={{ color: 'white' }} onClick={() => setOpen(true)} data-testid="switch-account-button">
        Switch account
      </Button>
    </>
  );
};

export default AccountSelector;
