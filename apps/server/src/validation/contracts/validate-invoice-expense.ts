import { InvoiceExpense } from "@/domain/entities";

export interface ValidateInvoiceExpense {
  execute: (data: Record<string, unknown>) => InvoiceExpense | null;
}
