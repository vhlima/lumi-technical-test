import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import Selector from "../../../../../../../../components/Selector";
import { useSession } from "../../../../../../../../hooks/useSession";
import { useAddress } from "../../../../../../../../hooks/useAddress";

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddressSelector: React.FC<Props> = (props) => {
  const { open, onClose } = props;

  const { client: session } = useSession();
  const { address, setAddress } = useAddress();

  return (
    <Selector title="Select your address" open={open} onClose={onClose}>
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
                  onClose();
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
  );
};

export default AddressSelector;
