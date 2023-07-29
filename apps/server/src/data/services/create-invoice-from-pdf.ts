import { Invoice } from "@/domain/entities";
import {
  CreateClient,
  CreateClientAddress,
  CreateInvoice,
  CreateInvoiceExpense,
  InvoiceParsers,
  LoadPDF,
} from "@/domain/usecases";
import { ServerError } from "@/errors";

export class CreateInvoiceFromPDFService {
  constructor(
    private readonly pdfLoader: LoadPDF,
    private readonly invoiceParserService: InvoiceParsers,
    private readonly createClientService: CreateClient,
    private readonly createInvoiceService: CreateInvoice,
    private readonly createInvoiceExpenseService: CreateInvoiceExpense,
    private readonly createClientAddressService: CreateClientAddress
  ) {}

  public async execute(
    pdfPath: string,
    clientId?: number
  ): Promise<Invoice | null> {
    const pdfDoc = await this.pdfLoader.execute(pdfPath);

    const page = await pdfDoc.getPage(1);

    const textContent = await page.getTextContent();

    const parsedInvoice = this.invoiceParserService.execute(textContent);

    if (!parsedInvoice) {
      return null;
    }

    if (clientId && parsedInvoice.client.id !== clientId) {
      throw new ServerError(
        "InvoiceNotFromClient",
        "This Invoice is not from the current client you are trying to upload",
        400
      );
    }

    const createdClient = await this.createClientService.execute({
      id: parsedInvoice.client.id,
      fullName: parsedInvoice.client.fullName,
    });

    const createdClientAddress = await this.createClientAddressService.execute({
      clientId: parsedInvoice.client.id,
      city: parsedInvoice.address.city,
      district: parsedInvoice.address.district,
      state: parsedInvoice.address.state,
      streetAddress: parsedInvoice.address.streetAddress,
      zipCode: parsedInvoice.address.zipCode,
    });

    if (!createdClient.addresses) {
      createdClient.addresses = [];
    }

    if (
      createdClient.addresses.findIndex(
        (address) => address.id === createdClientAddress.id
      ) === -1
    ) {
      createdClient.addresses = [
        ...createdClient.addresses,
        createdClientAddress,
      ];
    }

    const createdInvoice = await this.createInvoiceService.execute({
      clientId: parsedInvoice.client.id,
      addressId: createdClientAddress.id,
      price: parsedInvoice.price,
      expiresAt: parsedInvoice.expiresAt,
      relativeMonth: parsedInvoice.relativeMonth,
      relativeYear: parsedInvoice.relativeYear,
    });

    createdInvoice.client = createdClient;
    createdInvoice.address = createdClientAddress;

    const promises = parsedInvoice.expenses.map(async (expenseData) => {
      const expense = await this.createInvoiceExpenseService.execute({
        invoiceId: createdInvoice.id,
        ...expenseData,
      });
      return expense;
    });

    const createdExpenses = await Promise.all(promises);
    createdInvoice.expenses = createdExpenses;

    return {
      ...createdInvoice,
      energySpent: createdInvoice.energySpent,
    };
  }
}
