import { InvoiceExpense } from "@/domain/entities";

export interface ParseInvoiceExpenses {
  execute: (
    labelText: string,
    contentRows: string[][],
  ) => InvoiceExpense[];
}
