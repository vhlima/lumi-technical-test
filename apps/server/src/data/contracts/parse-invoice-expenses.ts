import { InvoiceExpenseModel } from "../models";

export interface ParseInvoiceExpenses {
  execute: (contentRows: string[][]) => InvoiceExpenseModel[];
}