import { InvoiceExpense } from "@/domain/entities";
import { CreateInvoiceExpense, CreateInvoiceExpenseData } from "@/domain/usecases";
import { IInvoicesExpensesRepository } from "@/data/contracts";

export class CreateInvoiceExpenseService implements CreateInvoiceExpense {
  constructor(private readonly invoiceExpensesRepository: IInvoicesExpensesRepository) {}

  public async execute(data: CreateInvoiceExpenseData): Promise<InvoiceExpense> {
    const invoice = await this.invoiceExpensesRepository.create(data);
    return invoice;
  }
}