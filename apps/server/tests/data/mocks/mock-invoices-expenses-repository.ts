import {
  CreateInvoiceExpenseData,
  IInvoicesExpensesRepository,
  IInvoicesRepository,
} from "@/data/contracts";
import { InvoiceExpense } from "@/domain/entities";
import { faker } from "@faker-js/faker";

export class MockInvoicesExpensesRepository
  implements IInvoicesExpensesRepository
{
  expenses: InvoiceExpense[];

  constructor(private readonly invoicesRepository: IInvoicesRepository) {
    this.expenses = [];
  }

  public async create(data: CreateInvoiceExpenseData): Promise<InvoiceExpense> {
    const { invoiceId, ...expenseData } = data;

    const expense: InvoiceExpense = {
      id: faker.number.int(),
      ...expenseData,
    };

    const invoice = await this.invoicesRepository.findById(invoiceId);
    if (invoice) {
      invoice.expenses.push(expense);
    }

    this.expenses.push(expense);
    return expense;
  }
}
