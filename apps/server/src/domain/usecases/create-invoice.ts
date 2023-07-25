import { Invoice } from "@/domain/entities";

export interface CreateInvoiceData {
  clientId: number;
  installationNumber: number;
  relativeTo: Date;
  expiresAt: Date;
}

export interface CreateInvoice {
  execute: (data: CreateInvoiceData) => Promise<Invoice>;
}