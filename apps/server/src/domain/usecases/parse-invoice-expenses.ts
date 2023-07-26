import { InvoiceExpense } from "@/domain/entities";

export interface ParseInvoiceExpenses {
  execute: (contentRows: string[][]) => InvoiceExpense[];
}
