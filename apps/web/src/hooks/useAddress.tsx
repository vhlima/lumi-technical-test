import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { ClientAddress } from "../interfaces";

interface AddressContextData {
  address: ClientAddress;
}

const AddressContext = createContext({} as AddressContextData);

interface Props {
  address: ClientAddress;
}

export const AddressProvider: React.FC<PropsWithChildren<Props>> = (props) => {
  const { address: initialState, children } = props;

  const [address, setAddress] = useState<ClientAddress>(initialState);

  const contextValue = useMemo(
    () => ({ address, setAddress }),
    [address, setAddress]
  );

  return (
    <AddressContext.Provider value={contextValue}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = (): AddressContextData => {
  const context = useContext(AddressContext);

  if (!context) {
    throw new Error("useAddress must be used within a provider");
  }

  return context;
};
