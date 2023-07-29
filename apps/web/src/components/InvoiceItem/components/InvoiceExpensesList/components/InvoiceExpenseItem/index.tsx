import { ListItem, Stack, Typography } from "@mui/material";
import { InvoiceExpense } from "../../../../../../interfaces";
import { parseToBRL } from "../../../../../../utils/currency-parser";

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
      <Typography
        sx={{ color: "text.primary" }}
        data-testid="invoice-expense-name"
      >
        {expense.name}
      </Typography>

      <Stack direction="column">
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {`Price: `}
          <span data-testid="invoice-expense-price">
            {parseToBRL(expense.price)}
          </span>
        </Typography>

        {expense.quantity && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {`Consumption: `}
            <span data-testid="invoice-expense-quantity">
              {expense.quantity}
            </span>
            {expense.measurementUnit ? ` ${expense.measurementUnit}` : ""}
          </Typography>
        )}

        {expense.unitaryPrice && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {`Unitary Price: `}
            <span data-testid="invoice-expense-unitary-price">
              {expense.unitaryPrice}
            </span>
          </Typography>
        )}

        {expense.unitaryTaxPrice && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {`Unitary Tax Price: `}
            <span data-testid="invoice-expense-unitary-tax-price">
              {expense.unitaryTaxPrice}
            </span>
          </Typography>
        )}
      </Stack>
    </ListItem>
  );
};

export default InvoiceExpenseItem;
