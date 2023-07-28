import { Invoice } from "@/domain/entities";

export interface ListInvoices {
  execute: (addressId: number) => Promise<Invoice[]>;
}