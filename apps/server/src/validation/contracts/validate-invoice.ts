import { InvoiceModel } from "@/data/models";

export interface ValidateInvoice {
  execute: (data: Record<string, unknown>) => InvoiceModel | null;
}
