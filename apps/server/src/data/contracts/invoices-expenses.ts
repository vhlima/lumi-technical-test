import { InvoiceExpense } from "@/domain/entities";
import { CreateInvoiceExpenseData } from "@/domain/usecases";

export interface IInvoicesExpensesRepository {
  create: (data: CreateInvoiceExpenseData) => Promise<InvoiceExpense>;
}