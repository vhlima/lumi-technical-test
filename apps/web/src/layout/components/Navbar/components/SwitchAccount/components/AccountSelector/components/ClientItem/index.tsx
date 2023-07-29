import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Person } from "@mui/icons-material";

interface Props {
  active?: boolean;
  fullName: string;
  onClick: () => void;
}

const ClientItem: React.FC<Props> = (props) => {
  const { fullName, active, onClick } = props;

  return (
    <ListItem
      sx={{
        ...(active ? { backgroundColor: "primary.main" } : {}),
      }}
      disableGutters
    >
      <ListItemButton onClick={onClick}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "blue.100", color: "blue.600" }}>
            <Person />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          sx={{
            ...(active ? { color: "white" } : {}),
          }}
          primary={fullName}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default ClientItem;
