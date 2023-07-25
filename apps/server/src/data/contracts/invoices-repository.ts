import { Invoice } from "@/domain/entities";
import { CreateInvoiceData } from "@/domain/usecases";

export interface IInvoicesRepository {
  create: (data: CreateInvoiceData) => Promise<Invoice>;
}