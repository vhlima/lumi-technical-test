import { Invoice } from "@/domain/entities";

export interface ListLatestInvoices {
  execute: (clientId: number) => Promise<Invoice[]>;
}