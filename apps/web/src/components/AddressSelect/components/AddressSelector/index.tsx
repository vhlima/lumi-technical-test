import { useSession } from "../../../../hooks/useSession";
import { useAddress } from "../../../../hooks/useAddress";
import Selector from "../../../Selector";
import AddressItem from "../AddressItem";

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddressSelector: React.FC<Props> = (props) => {
  const { open, onClose } = props;

  const { client: session } = useSession();
  const { address, setAddress } = useAddress();

  return (
    <Selector
      title="Select your address"
      open={open}
      onClose={onClose}
      data-testid="address-selector"
    >
      {session &&
        session.addresses.map((currentAddress) => {
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
    </Selector>
  );
};

export default AddressSelector;
