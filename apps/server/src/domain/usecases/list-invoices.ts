import { Invoice } from "@/domain/entities";

export interface ListInvoices {
  execute: (clientId: number) => Promise<Invoice[]>;
}