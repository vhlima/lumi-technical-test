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
      energySpent: 0,
      client: {
        id: clientId,
        fullName: "",
        addresses: [],
      },
      address: {
        city: "",
        district: "",
        id: 11,
        state: "",
        streetAddress: "",
        zipCode: "",
      },
      ...invoiceData,
    };

    this.invoices.push(invoice);
    return invoice;
  }

  public async findByDate(
    clientId: number,
    addressId: number,
    year: number,
    month: number
  ): Promise<Invoice | null> {
    const invoice = this.invoices.find(
      (invoice) =>
        invoice.client?.id === clientId &&
        invoice.address?.id === addressId &&
        invoice.relativeMonth === month &&
        invoice.relativeYear === year
    );

    return invoice || null;
  }

  public async findLatest(
    clientId: number,
    latest: number
  ): Promise<Invoice[]> {
    const sorted = [...this.invoices]
      .filter((invoice) => invoice.client?.id === clientId)
      .sort((i1, i2) => (i1.relativeYear + i1.relativeMonth) - (i2.relativeYear + i2.relativeMonth));

    return sorted.slice(0, latest);
  }

  public async list(clientId: number): Promise<Invoice[]> {
    return this.invoices.filter((invoice) => invoice.client?.id === clientId);
  }
}
