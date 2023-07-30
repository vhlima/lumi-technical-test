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

type SutType = {
  invoice: Invoice;
  sut: CreateInvoiceFromPDFService;
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
  const invoicesRepository = new MockInvoicesRepository([],
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
      expenses: (createdInvoice?.expenses || []).map(({ id, ...expense }) => expense)
    }).toEqual({
      ...invoice,
      id: undefined,
      expenses: invoice.expenses.map(({ id, ...expense }) => expense)
    });
  });
});
