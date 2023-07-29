import { InvoiceModel } from "@/data/models";

export interface ParseInvoice {
  execute: (contentRows: string[][]) => InvoiceModel | null;
}