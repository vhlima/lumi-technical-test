import { Invoice } from "@/domain/entities";

export interface CreateInvoiceData {
  clientId: number;
  addressId: number;
  price: number;
  relativeYear: number;
  relativeMonth: number;
  expiresAt: Date;
}

export interface IInvoicesRepository {
  create: (data: CreateInvoiceData) => Promise<Invoice>;
  list: (addressId: number) => Promise<Invoice[]>;
  findByDate: (
    clientId: number,
    addressId: number,
    year: number,
    month: number
  ) => Promise<Invoice | null>;
  findById: (invoiceId: number) => Promise<Invoice | null>;
}
