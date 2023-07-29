import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import { useSession } from "../../../../../../../hooks/useSession";
import { Client } from "../../../../../../../interfaces";
import { ListClientsService } from "../../../../../../../services";
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
      <DialogTitle>
        Switch accounts
        <IconButton
          size="large"
          sx={{ marginLeft: 2, color: "warning.main" }}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      {clientList.length === 0 ? (
        <DialogContent>
          <Typography>No account was found.</Typography>
        </DialogContent>
      ) : (
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
      )}
    </Dialog>
  );
};

export default ClientSelectorDialog;
