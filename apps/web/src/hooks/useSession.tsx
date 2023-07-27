import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Client } from "../interfaces";

interface SessionContextData {
  client?: Client;
  signIn: (client: Client) => void;
}

const SessionContext = createContext({} as SessionContextData);

export const SessionProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [client, setClient] = useState<Client>();

  const signIn = useCallback(
    (client: Client) => {
      setClient(client);
    },
    [setClient]
  );

  const contextValue = useMemo(() => ({ client, signIn }), [client, signIn]);

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextData => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a provider");
  }

  return context;
};
