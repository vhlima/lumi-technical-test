import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Invoice } from "../../../interfaces";
import { ListInvoicesService } from "../../../services";
import { useAddress } from "../../../hooks/useAddress";

interface InvoiceListContextData {
  invoices: Invoice[];
  setInvoices: Dispatch<SetStateAction<Invoice[]>>;
}

const InvoiceListContext = createContext({} as InvoiceListContextData);

export const InvoiceListProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const { address } = useAddress();

  useEffect(() => {
    (async () => {
      if (!address) {
        return;
      }

      const listInvoicesService = new ListInvoicesService();
      const invoiceListResponse = await listInvoicesService.execute(address.id);

      const invoicesSorted = invoiceListResponse.sort(
        (i1, i2) => i1.relativeYear - i2.relativeYear
      );
      setInvoices(invoicesSorted);
    })();
  }, [address]);

  const contextValue = useMemo(
    () => ({ invoices, setInvoices }),
    [invoices, setInvoices]
  );

  return (
    <InvoiceListContext.Provider value={contextValue}>
      {children}
    </InvoiceListContext.Provider>
  );
};

export const useInvoiceList = (): InvoiceListContextData => {
  const context = useContext(InvoiceListContext);

  if (!context) {
    throw new Error("useInvoiceList must be used within a provider");
  }

  return context;
};
