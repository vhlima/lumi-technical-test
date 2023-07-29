import { Invoice } from "@/domain/entities";
import { CreateInvoiceData } from "@/domain/usecases";

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
