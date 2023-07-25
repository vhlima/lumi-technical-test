import { MonetizationOn } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { format } from "date-fns";

interface Props {
  installationNumber: number;
  price: number;
  relativeTo: string;
  expiresAt: string;
}

const InvoiceItem: React.FC<Props> = (props) => {
  const { installationNumber, price, expiresAt, relativeTo } = props;

  return (
    <ListItem divider>
      <ListItemIcon>
        <MonetizationOn fontSize="large" />
      </ListItemIcon>
      <ListItemText
        primary={`Installation Number: ${installationNumber}`}
        secondary={
          <>
            <div>Price: R$ {price.toFixed(2)}</div>
            <div>
              {`Relative to: ${format(new Date(relativeTo), "MMMM yyyy")}`}
            </div>
            <div>
              {`Expires at: ${format(new Date(expiresAt), "MMMM dd, yyyy")}`}
            </div>
          </>
        }
      />
    </ListItem>
  );
};

export default InvoiceItem;
