import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { Client } from "../../../../../../interfaces";
import { Person } from "@mui/icons-material";
import { useSession } from "../../../../../../hooks/useSession";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ClientSelectorDialog: React.FC<Props> = (props) => {
  const { open, onClose } = props;

  const { client: session, signIn } = useSession();

  const [clientList, setClientList] = useState<Client[]>(
    Array.from({ length: 5 }).map((_, index) => ({
      id: 7202788969 + index,
      fullName: "Bronyer Tozatti Ferreira",
      addresses: [
        {
          id: 10,
          streetAddress: "Rua Joao De Assis Martins 71 In",
          district: "Centro Sul",
          zipCode: "35182-036",
          state: "MG",
          city: "Timoteo",
        },
      ],
    }))
  );

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Switch accounts</DialogTitle>
      <List sx={{ pt: 0 }}>
        {clientList.map((client) => {
          const isSameSession = session && session.id === client.id;
          return (
            <ListItem
              sx={{
                ...(isSameSession ? { backgroundColor: "primary.main" } : {}),
              }}
              key={`client-${client.id}`}
              disableGutters
            >
              <ListItemButton
                onClick={() => {
                  signIn(client);
                  onClose();
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "blue.100", color: "blue.600" }}>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    ...(isSameSession ? { color: "white" } : {}),
                  }}
                  primary={client.fullName}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Dialog>
  );
};

export default ClientSelectorDialog;
