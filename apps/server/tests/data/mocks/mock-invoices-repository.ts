import {
  CreateInvoiceData,
  IClientsAddressesRepository,
  IClientsRepository,
  IInvoicesRepository,
} from "@/data/contracts";
import { Invoice } from "@/domain/entities";
import { mockInvoice } from "@/tests/domain/mocks";
import { faker } from "@faker-js/faker";

export class MockInvoicesRepository implements IInvoicesRepository {
  invoices: Invoice[];

  constructor(
    invoices: Invoice[],
    private readonly addressRepository?: IClientsAddressesRepository,
    private readonly clientsRepository?: IClientsRepository
  ) {
    this.invoices = invoices;
  }

  public async create(data: CreateInvoiceData): Promise<Invoice> {
    const { clientId, addressId, ...invoiceData } = data;

    if (this.clientsRepository && this.addressRepository) {
      const client = await this.clientsRepository.findById(clientId);

      if (!client) {
        return {} as Invoice;
      }

      const address = await this.addressRepository.findById(addressId);

      if (!address) {
        return {} as Invoice;
      }

      const invoice: Invoice = {
        id: faker.number.int(),
        client,
        address,
        expenses: [],
        energySpent: 0,
        ...invoiceData,
      };

      this.invoices.push(invoice);
      return invoice;
    }

    const invoice = mockInvoice();

    return {
      ...invoice,
      ...invoiceData,
    };
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

  public async list(addressId: number): Promise<Invoice[]> {
    return this.invoices.filter((invoice) => invoice.address.id === addressId);
  }
}
