import { Invoice } from "@/domain/entities";
import { CreateInvoiceData } from "@/domain/usecases";

export interface IInvoicesRepository {
  create: (data: CreateInvoiceData) => Promise<Invoice>;
  findLatest: (clientId: number, latest: number) => Promise<Invoice[]>;
  list: (clientId: number) => Promise<Invoice[]>;
  findByDate: (clientId: number, addressId: number, date: Date) => Promise<Invoice | null>;
}