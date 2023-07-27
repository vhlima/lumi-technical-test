import { Dialog, DialogTitle, List } from "@mui/material";
import { useEffect, useState } from "react";
import { Client } from "../../../../../../interfaces";
import { useSession } from "../../../../../../hooks/useSession";
import { ListClientsService } from "../../../../../../services";
import ClientItem from "./components/ClientItem";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ClientSelectorDialog: React.FC<Props> = (props) => {
  const { open, onClose } = props;

  const { client: session, signIn } = useSession();

  const [clientList, setClientList] = useState<Client[]>([]);

  useEffect(() => {
    (async () => {
      const listClientsService = new ListClientsService();
      const clientListResponse = await listClientsService.execute();
      setClientList(clientListResponse);
    })();
  }, []);

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Switch accounts</DialogTitle>
      <List sx={{ pt: 0 }}>
        {clientList.map((client) => (
          <ClientItem
            key={`client-${client.id}`}
            fullName={client.fullName}
            active={session && session.id === client.id}
            onClick={() => {
              signIn(client);
              onClose();
            }}
          />
        ))}
      </List>
    </Dialog>
  );
};

export default ClientSelectorDialog;
