import { ListItem, Stack, Typography } from "@mui/material";
import { InvoiceExpense } from "../../../../../../interfaces";

interface Props {
  expense: InvoiceExpense;
}

const InvoiceExpenseItem: React.FC<Props> = (props) => {
  const { expense } = props;

  return (
    <ListItem
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
      }}
      divider
    >
      <Typography sx={{ color: "text.primary" }}>{expense.name}</Typography>

      <Stack direction="column">
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Price: R$ {expense.price}
        </Typography>

        {expense.quantity && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {`Consumption: ${expense.quantity}${
              expense.measurementUnit ? ` ${expense.measurementUnit}` : ""
            }`}
          </Typography>
        )}

        {expense.unitaryPrice && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Unitary Price: {expense.unitaryPrice}
          </Typography>
        )}

        {expense.unitaryTaxPrice && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Unitary Tax Price: {expense.unitaryTaxPrice}
          </Typography>
        )}
      </Stack>
    </ListItem>
  );
};

export default InvoiceExpenseItem;
