import { ListItem, ListItemButton, ListItemText } from "@mui/material";

interface Props {
  streetAddress: string;
  active?: boolean;
  onClick: () => void;
}

const AddressItem: React.FC<Props> = (props) => {
  const { streetAddress, active, onClick } = props;

  return (
    <ListItem
      sx={{
        ...(active ? { backgroundColor: "primary.main" } : {}),
      }}
      disableGutters
    >
      <ListItemButton onClick={onClick}>
        <ListItemText
          sx={{
            ...(active ? { color: "white" } : {}),
          }}
          primary={streetAddress}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default AddressItem;
