import { Invoice } from "@/domain/entities";

export interface CreateInvoiceData {
  clientId: number;
  addressId: number;
  price: number;
  relativeYear: number;
  relativeMonth: number;
  expiresAt: Date;
}

export interface CreateInvoice {
  execute: (data: CreateInvoiceData) => Promise<Invoice>;
}