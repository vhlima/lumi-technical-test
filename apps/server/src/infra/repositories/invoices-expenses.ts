import { IInvoicesExpensesRepository } from "@/data/contracts";
import { Repository } from "typeorm";
import { InvoiceExpenseEntity } from "@/infra/entities";
import { PostgresDataSource } from "@/infra/data-sources";
import { InvoiceExpense } from "@/domain/entities";
import { CreateInvoiceExpenseData } from "@/domain/usecases";

export class InvoicesExpensesRepository implements IInvoicesExpensesRepository {
  private ormRepository: Repository<InvoiceExpenseEntity>;

  constructor() {
    this.ormRepository = PostgresDataSource.getRepository(InvoiceExpenseEntity);
  }

  public async create(data: CreateInvoiceExpenseData): Promise<InvoiceExpense> {
    const { invoiceId,  ...expenseData } = data;
    const invoiceExpense = this.ormRepository.create({
      ...expenseData,
      invoice: {
        id: invoiceId,
      },
    });
    await this.ormRepository.save(invoiceExpense);
    return invoiceExpense;
  }
}
