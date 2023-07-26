import { Invoice } from "@/domain/entities";

export interface ParseInvoice {
  execute: (contentRows: string[][]) => Invoice | null;
}