import { InvoiceExpenseModel } from "@/data/models";

export interface ValidateInvoiceExpense {
  execute: (data: Record<string, unknown>) => InvoiceExpenseModel | null;
}
