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
import { useSession } from "../../../hooks/useSession";

interface InvoiceListContextData {
  invoices: Invoice[];
  setInvoices: Dispatch<SetStateAction<Invoice[]>>;
}

const InvoiceListContext = createContext({} as InvoiceListContextData);

export const InvoiceListProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const { client: session } = useSession();

  useEffect(() => {
    (async () => {
      if (!session) {
        return;
      }

      const listInvoicesService = new ListInvoicesService();
      const invoiceListResponse = await listInvoicesService.execute(session.id);
      setInvoices(invoiceListResponse);
    })();
  }, [session]);

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
