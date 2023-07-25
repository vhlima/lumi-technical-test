import { InvoiceExpense } from "@/domain/entities";

export interface ParseInvoiceExpenses {
  execute: (
    rows: string[][],
    rowIndex: number,
    itemIndex: number
  ) => InvoiceExpense[];
}
