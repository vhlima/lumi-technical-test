import { ParseInvoiceExpenses } from "@/domain/usecases";
import { InvoiceExpense } from "@/domain/entities";

export class ParseExpensesService implements ParseInvoiceExpenses {
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
        expenses.push({
          name: content[itemIndex],
          price: parseInt(content[itemIndex + 2], 10),
        } as InvoiceExpense);
      } else if (content.length === 11) {
        expenses.push({
          name: content[itemIndex],
          measurementUnit: content[itemIndex + 2].toUpperCase(),
          quantity: parseInt(content[itemIndex + 4].replace('.', ''), 10),
          unitaryPrice: parseFloat(content[itemIndex + 6].replace(",", ".")),
          price: parseInt(content[itemIndex + 8], 10),
          unitaryTaxPrice: parseFloat(
            content[itemIndex + 10].replace(",", ".")
          ),
        } as InvoiceExpense);
      }

      rowIndex++;
    }

    return expenses;
  }
}
