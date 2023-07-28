import {
  Box,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useAddress } from "../../../../../../hooks/useAddress";
import { useState } from "react";
import Selector from "../../../../../../components/Selector";
import { useSession } from "../../../../../../hooks/useSession";

const AddressSelect: React.FC = () => {
  const { client: session } = useSession();
  const { address, setAddress } = useAddress();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Selector
        title="Select your address"
        open={open}
        onClose={() => setOpen(false)}
      >
        {session &&
          session.addresses.map((currentAddress) => {
            const active = currentAddress.id === address.id;
            return (
              <ListItem
                key={`address-${currentAddress.id}`}
                sx={{
                  ...(active ? { backgroundColor: "primary.main" } : {}),
                }}
                disableGutters
              >
                <ListItemButton
                  onClick={() => {
                    setAddress(currentAddress);
                    setOpen(false);
                  }}
                >
                  <ListItemText
                    sx={{
                      ...(active ? { color: "white" } : {}),
                    }}
                    primary={currentAddress.streetAddress}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
      </Selector>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexDirection: { xs: "column", md: "row" },
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <Typography variant="h6">{address.streetAddress}</Typography>

        <Button
          sx={{ sm: { width: "100%" }, marginLeft: { md: "auto" } }}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Change selected address
        </Button>
      </Box>
    </>
  );
};

export default AddressSelect;
