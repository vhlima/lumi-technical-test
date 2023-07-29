import { List } from "@mui/material";
import { InvoiceExpense } from "../../../../interfaces";
import InvoiceExpenseItem from "./components/InvoiceExpenseItem";

interface Props {
  expenses: InvoiceExpense[];
}

const InvoiceExpensesList: React.FC<Props> = (props) => {
  const { expenses } = props;

  return (
    <List disablePadding data-testid="invoice-expenses-list">
      {expenses.map((expense) => (
        <InvoiceExpenseItem
          key={`invoice-expense-${expense.id}`}
          expense={expense}
        />
      ))}
    </List>
  );
};

export default InvoiceExpensesList;
