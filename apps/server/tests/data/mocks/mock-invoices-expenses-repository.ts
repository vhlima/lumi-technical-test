import {
  CreateInvoiceExpenseData,
  IInvoicesExpensesRepository,
} from "@/data/contracts";
import { InvoiceExpense } from "@/domain/entities";
import { faker } from "@faker-js/faker";

export class MockInvoicesExpensesRepository
  implements IInvoicesExpensesRepository
{
  expenses: InvoiceExpense[];

  constructor(expenses: InvoiceExpense[] = []) {
    this.expenses = expenses;
  }

  public async create(data: CreateInvoiceExpenseData): Promise<InvoiceExpense> {
    const expense: InvoiceExpense = {
      id: faker.number.int(),
      ...data,
    };

    this.expenses.push(expense);
    return expense;
  }
}
