import { List, ListItem, Stack, Typography } from "@mui/material";
import { InvoiceExpense } from "../../../../interfaces";

interface Props {
  expenses: InvoiceExpense[];
}

const InvoiceExpensesList: React.FC<Props> = (props) => {
  const { expenses } = props;

  return (
    <List disablePadding>
      {expenses.map((expense) => (
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
          key={`invoice-expense-${expense.id}`}
          divider
        >
          <Typography sx={{ color: "text.primary" }}>{expense.name}</Typography>

          <Stack direction="column">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Price: R$ {expense.price}
            </Typography>
            {expense.quantity && (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Quantity: {expense.quantity}
              </Typography>
            )}
            {expense.measurementUnit && (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Measurement Unit: {expense.measurementUnit}
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
      ))}
    </List>
  );
};

export default InvoiceExpensesList;
