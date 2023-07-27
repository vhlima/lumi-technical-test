import { Invoice } from "@/domain/entities";

export interface InvoiceParsers {
  execute: (contentRows: string[][]) => Invoice | null;
}