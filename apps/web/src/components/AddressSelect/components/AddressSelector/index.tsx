import { useAddress } from "../../../../hooks/useAddress";
import Selector from "../../../Selector";
import AddressItem from "../AddressItem";
import { ClientAddress } from "../../../../interfaces";
import { Box, Typography } from "@mui/material";

interface Props {
  addresses: ClientAddress[];
  open: boolean;
  onClose: () => void;
}

const AddressSelector: React.FC<Props> = (props) => {
  const { addresses, open, onClose } = props;

  const { address, setAddress } = useAddress();

  return (
    <Selector
      title="Select your address"
      open={open}
      onClose={onClose}
      data-testid="address-selector"
    >
      {addresses.length === 0 ? (
        <Typography data-testid="address-selector-empty">
          No address was found.
        </Typography>
      ) : (
        <Box data-testid="address-selector-list">
          {addresses.map((currentAddress) => {
            const active = currentAddress.id === address.id;
            return (
              <AddressItem
                key={`address-${currentAddress.id}`}
                streetAddress={currentAddress.streetAddress}
                active={active}
                onClick={() => {
                  setAddress(currentAddress);
                  onClose();
                }}
              />
            );
          })}
        </Box>
      )}
    </Selector>
  );
};

export default AddressSelector;
