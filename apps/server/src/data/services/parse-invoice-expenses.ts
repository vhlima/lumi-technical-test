import { ParseInvoiceExpenses } from "@/domain/usecases";
import { InvoiceExpense } from "@/domain/entities";
import { ValidateInvoiceExpense } from "@/validation/contracts";

export class ParseExpensesService implements ParseInvoiceExpenses {
  constructor(
    private readonly invoiceExpenseValidation: ValidateInvoiceExpense
  ) {}

  public execute(
    rows: string[][],
    rowIndex: number,
    itemIndex: number
  ): InvoiceExpense[] {
    const expenses: InvoiceExpense[] = [];

    const startRowIndex = rowIndex;

    while (rowIndex < rows.length) {
      const content = rows[rowIndex];

      if (rowIndex !== startRowIndex && !content[0].trim()) {
        break;
      }

      if (rowIndex === startRowIndex) {
        content.splice(0, 1);
      }

      if (content.length === 3) {
        const invoiceData = {
          name: content[itemIndex],
          price: content[itemIndex + 2],
        };

        const invoice = this.invoiceExpenseValidation.execute(invoiceData);

        if (invoice) {
          expenses.push(invoice);
        }
      } else if (content.length === 11) {
        const invoiceData = {
          name: content[itemIndex],
          measurementUnit: content[itemIndex + 2],
          quantity: parseInt(content[itemIndex + 4].replace(".", ""), 10),
          unitaryPrice: parseFloat(content[itemIndex + 6].replace(",", ".")),
          price: parseInt(content[itemIndex + 8], 10),
          unitaryTaxPrice: parseFloat(
            content[itemIndex + 10].replace(",", ".")
          ),
        };

        const invoice = this.invoiceExpenseValidation.execute(invoiceData);

        if (invoice) {
          expenses.push(invoice);
        }
      }

      rowIndex++;
    }

    return expenses;
  }
}
