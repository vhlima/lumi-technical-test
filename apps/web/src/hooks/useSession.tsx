import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Client } from "../interfaces";
import { FindClientService } from "../services";

interface SessionContextData {
  client?: Client;
  signIn: (client: Client) => void;
}

const SessionContext = createContext({} as SessionContextData);

/*
  Usually, we won't be persisting client id directly from localStorage,
  but since this is not a key feature of this MVP, we are going this way
  just to same some time.
*/
export const SessionProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [client, setClient] = useState<Client>();

  const signIn = useCallback(
    (client: Client) => {
      setClient(client);
      localStorage.setItem("client-id", String(client.id));
    },
    [setClient]
  );

  useEffect(() => {
    (async () => {
      if (client) {
        return; 
      }

      const localStorageClientId = localStorage.getItem("client-id");

      if (localStorageClientId) {
        try {
          const findClientService = new FindClientService();
          const client = await findClientService.execute(
            parseInt(localStorageClientId, 10)
          );

          if (!client) {
            localStorage.removeItem("cleint-id");
            setClient(undefined);
            return;
          }
          setClient(client);
        } catch (err) {}
      }
    })();
  }, [client]);

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
