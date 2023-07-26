import { ParseInvoiceExpenses } from "@/domain/usecases";
import { InvoiceExpense } from "@/domain/entities";
import { ValidateInvoiceExpense } from "@/validation/contracts";
import { ServerError } from "@/errors";

export class ParseExpensesService implements ParseInvoiceExpenses {
  private labelText = 'Valores Faturados';

  constructor(
    private readonly invoiceExpenseValidation: ValidateInvoiceExpense
  ) {}

  public execute(contentRows: string[][]): InvoiceExpense[] {
    const expenses: InvoiceExpense[] = [];

    let rowIndex = -1;

    for (let i = 0; i < contentRows.length; i++) {
      for (let y = 0; y < contentRows[i].length; y++) {
        if (contentRows[i][y] === this.labelText) {
          rowIndex = i + 3;
          break;
        }
      }
    }

    if (rowIndex === -1) {
      throw new ServerError("ParseExpenseError", "Label text not found", 404);
    }

    const startRowIndex = rowIndex;

    while (rowIndex < contentRows.length) {
      const content = contentRows[rowIndex];

      if (rowIndex !== startRowIndex && !content[0].trim()) {
        break;
      }

      if (rowIndex === startRowIndex) {
        content.splice(0, 1);
      }

      if (content.length === 3) {
        const invoiceData = {
          name: content[0],
          price: parseInt(content[2], 10),
        };

        const invoice = this.invoiceExpenseValidation.execute(invoiceData);

        if (invoice) {
          expenses.push(invoice);
        }
      } else if (content.length === 11) {
        const invoiceData = {
          name: content[0],
          measurementUnit: content[2],
          quantity: parseInt(content[4].replace(".", ""), 10),
          unitaryPrice: parseFloat(content[6].replace(",", ".")),
          price: parseInt(content[8], 10),
          unitaryTaxPrice: parseFloat(
            content[10].replace(",", ".")
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
