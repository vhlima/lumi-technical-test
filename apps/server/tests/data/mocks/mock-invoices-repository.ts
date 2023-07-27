import { faker } from "@faker-js/faker";
import { IInvoicesRepository } from "@/data/contracts";
import { Invoice } from "@/domain/entities";
import { CreateInvoiceData } from "@/domain/usecases";

export class MockInvoicesRepository implements IInvoicesRepository {
  invoices: Invoice[];

  constructor(invoices: Invoice[] = []) {
    this.invoices = invoices;
  }

  public async create(data: CreateInvoiceData): Promise<Invoice> {
    const { clientId, ...invoiceData } = data;
    const invoice: Invoice = {
      id: faker.number.int(),
      expenses: [],
      price: 0,
      energySpent: 0,
      client: {
        id: clientId,
        fullName: "",
      },
      ...invoiceData,
    };

    this.invoices.push(invoice);
    return invoice;
  }

  public async findByDate(
    clientId: number,
    date: Date
  ): Promise<Invoice | null> {
    const invoice = this.invoices.find(
      (invoice) =>
        invoice.client?.id === clientId &&
        invoice.relativeTo.getTime() === date.getTime()
    );

    return invoice || null;
  }

  public async findLatest(
    clientId: number,
    latest: number
  ): Promise<Invoice[]> {
    const sorted = [...this.invoices]
      .filter((invoice) => invoice.client?.id === clientId)
      .sort((i1, i2) => i1.relativeTo.getTime() - i2.relativeTo.getTime());

    return sorted.slice(0, latest);
  }

  public async list(clientId: number): Promise<Invoice[]> {
    return this.invoices.filter((invoice) => invoice.client?.id === clientId);
  }
}
