import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import AddressSelector from "./components/AddressSelector";
import { useAddress } from "../../hooks/useAddress";
import { useSession } from "../../hooks/useSession";

const AddressSelect: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { client: session } = useSession();
  const { address } = useAddress();

  return (
    <>
      <AddressSelector
        addresses={session?.addresses || []}
        open={open}
        onClose={() => setOpen(false)}
      />

      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexDirection: { xs: "column", md: "row" },
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <Typography
          sx={{ color: "text.primary" }}
          variant="h6"
          data-testid="street-address"
        >
          {address.streetAddress}
        </Typography>

        <Button
          sx={{ sm: { width: "100%" }, marginLeft: { md: "auto" } }}
          variant="contained"
          onClick={() => setOpen(true)}
          data-testid="address-select-button"
        >
          Change selected address
        </Button>
      </Box>
    </>
  );
};

export default AddressSelect;
