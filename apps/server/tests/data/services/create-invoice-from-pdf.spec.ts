import { CreateInvoiceFromPDFService } from "@/data/services";
import {
  MockClientAddressesRepository,
  MockClientsRepository,
  MockInvoicesExpensesRepository,
  MockInvoicesRepository,
} from "@/tests/data/mocks";
import { Invoice } from "@/domain/entities";
import { MockLoadPDF } from "@/tests/adapters/mocks";
import { getInvoiceParsersService } from "@/main/factories";
import { faker } from "@faker-js/faker";
import { IInvoicesRepository } from "@/data/contracts";

type SutType = {
  invoice: Invoice;
  sut: CreateInvoiceFromPDFService;
  invoicesRepository: IInvoicesRepository;
};

const createSut = (): SutType => {
  const mockLoadPDF = new MockLoadPDF();

  const invoice = mockLoadPDF.invoice;
  /* Make sure that we only have one address at mocked invoice */
  invoice.client.addresses = invoice.client.addresses.slice(0, 1);

  const clientsRepository = new MockClientsRepository();
  const clientsAddressRepository = new MockClientAddressesRepository(
    clientsRepository
  );
  const invoicesRepository = new MockInvoicesRepository(
    [],
    clientsAddressRepository,
    clientsRepository
  );
  const invoicesExpensesRepository = new MockInvoicesExpensesRepository(
    invoicesRepository
  );

  const sut = new CreateInvoiceFromPDFService(
    mockLoadPDF,
    getInvoiceParsersService(),
    clientsRepository,
    invoicesRepository,
    invoicesExpensesRepository,
    clientsAddressRepository
  );
  return {
    sut,
    invoice,
    invoicesRepository,
  };
};

describe("CreateInvoiceFromPDF", () => {
  test("Should create invoice from pdf text content", async () => {
    const { sut, invoice } = createSut();

    const createdInvoice = await sut.execute("");

    /* We dont need to compare ids in this case */
    expect({
      ...createdInvoice,
      id: undefined,
      expenses: (createdInvoice?.expenses || []).map(
        ({ id, ...expense }) => expense
      ),
    }).toEqual({
      ...invoice,
      id: undefined,
      expenses: invoice.expenses.map(({ id, ...expense }) => expense),
    });
  });
  test("Should not be able to create invoice with other clientId", async () => {
    const { sut } = createSut();

    expect(async () => {
      await sut.execute("", faker.number.int());
    }).rejects.toThrowError();
  });
  test("Should not be able to create invoice with the same date", async () => {
    const { sut, invoice, invoicesRepository } = createSut();

    await invoicesRepository.create({
      addressId: invoice.address.id,
      clientId: invoice.client.id,
      expiresAt: invoice.expiresAt,
      price: invoice.price,
      relativeMonth: invoice.relativeMonth,
      relativeYear: invoice.relativeYear,
    });

    expect(async () => {
      await sut.execute("", faker.number.int());
    }).rejects.toThrowError();
  });
});
