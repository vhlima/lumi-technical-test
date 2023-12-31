import { LabelMapper } from "@/domain/usecases";
import { InvoiceExpenseModel } from "@/data/models";
import { ValidateInvoiceExpense } from "@/validation/contracts";
import { ServerError } from "@/errors";
import { ParseInvoiceExpenses } from "@/data/contracts";

export class ParseExpensesService implements ParseInvoiceExpenses {
  constructor(
    private readonly invoiceExpenseValidation: ValidateInvoiceExpense,
    private readonly labelMapper: LabelMapper
  ) {}

  public execute(contentRows: string[][]): InvoiceExpenseModel[] {
    const expenses: InvoiceExpenseModel[] = [];

    this.labelMapper.execute(contentRows, {
      expenses: {
        label: "Valores Faturados",
        location: [3, 0],
        parseValue: (
          value: string,
          index: number,
          rowIndex: number,
          rows: string[][]
        ) => {
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
              const name = content[0];
              if(name === "TOTAL") {
                break;
              }

              const invoiceData = {
                name,
                price: parseFloat(content[2].replace(",", ".")),
              };

              const invoice =
                this.invoiceExpenseValidation.execute(invoiceData);

              if (invoice) {
                expenses.push(invoice);
              }
            } else if (content.length === 11) {
              const invoiceData = {
                name: content[0],
                measurementUnit: content[2],
                quantity: parseInt(content[4].replace(".", ""), 10),
                unitaryPrice: parseFloat(content[6].replace(",", ".")),
                price: parseFloat(content[8].replace(",", ".")),
                unitaryTaxPrice: parseFloat(content[10].replace(",", ".")),
              };

              const invoice =
                this.invoiceExpenseValidation.execute(invoiceData);

              if (invoice) {
                expenses.push(invoice);
              }
            }

            rowIndex++;
          }

          return expenses;
        },
      },
    });

    if (expenses.length === 0) {
      throw new ServerError(
        "InvoiceExpensesNotFound",
        "No expense for this Invoice was found",
        404
      );
    }

    return expenses;
  }
}
