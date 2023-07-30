import { CreateInvoiceData, IInvoicesRepository } from "@/data/contracts";
import { Invoice } from "@/domain/entities";
import { mockInvoice } from "@/tests/domain/mocks";

export class MockInvoicesRepository implements IInvoicesRepository {
  invoices: Invoice[];

  constructor(invoices: Invoice[] = []) {
    this.invoices = invoices;
  }

  public async create(data: CreateInvoiceData): Promise<Invoice> {
    const { clientId, addressId, ...invoiceData } = data;

    const mockedInvoice = mockInvoice();
    mockedInvoice.client.id = clientId;
    mockedInvoice.address.id = addressId;

    const invoice: Invoice = {
      ...mockedInvoice,
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
        invoice.client.id === clientId &&
        invoice.address.id === addressId &&
        invoice.relativeMonth === month &&
        invoice.relativeYear === year
    );

    return invoice || null;
  }

  public async findById(invoiceId: number): Promise<Invoice | null> {
    const invoice = this.invoices.find((invoice) => invoice.id === invoiceId);
    return invoice || null;
  }

  public async list(clientId: number): Promise<Invoice[]> {
    return this.invoices.filter((invoice) => invoice.client.id === clientId);
  }
}
