import { Invoice } from "@/domain/entities";
import { LoadPDF } from "@/domain/usecases";
import { ServerError } from "@/errors";
import {
  IClientsAddressesRepository,
  IClientsRepository,
  IInvoicesExpensesRepository,
  IInvoicesRepository,
  InvoiceParsers,
} from "@/data/contracts";

export class CreateInvoiceFromPDFService {
  constructor(
    private readonly pdfLoader: LoadPDF,
    private readonly invoiceParserService: InvoiceParsers,
    private readonly clientsRepository: IClientsRepository,
    private readonly invoicesRepository: IInvoicesRepository,
    private readonly invoicesExpensesRepository: IInvoicesExpensesRepository,
    private readonly clientsAddressesRepository: IClientsAddressesRepository
  ) {}

  public async execute(
    pdfPath: string,
    clientId?: number
  ): Promise<Invoice | null> {
    const pdfDoc = await this.pdfLoader.execute(pdfPath);

    const page = await pdfDoc.getPage(1);

    const textContent = await page.getTextContent();

    const parserResponse = this.invoiceParserService.execute(textContent);

    if (!parserResponse) {
      throw new ServerError(
        "ErrorParsingInvoice",
        "There was an error parsing this invoice",
        400
      );
    }

    const {
      invoice: parsedInvoice,
      client: parsedClient,
      expenses: parsedExpenses,
      address: parsedAddress,
    } = parserResponse;

    if (clientId && parsedClient.id !== clientId) {
      throw new ServerError(
        "InvoiceNotFromClient",
        "This Invoice is not from the current client you are trying to upload",
        400
      );
    }

    const invoiceDateExists = await this.invoicesRepository.findByDate(
      parsedClient.id,
      parsedAddress.id,
      parsedInvoice.relativeYear,
      parsedInvoice.relativeMonth
    );

    if (invoiceDateExists) {
      throw new ServerError(
        "InvoiceAlreadyRegistered",
        "There is already an invoice registered within this month",
        409
      );
    }

    /* Data transfer between parsed invoice and Invoice entity */
    const invoice = new Invoice();
    invoice.price = parsedInvoice.price;
    invoice.expiresAt = parsedInvoice.expiresAt;
    invoice.relativeMonth = parsedInvoice.relativeMonth;
    invoice.relativeYear = parsedInvoice.relativeYear;

    const clientExists = await this.clientsRepository.findById(parsedClient.id);

    if (clientExists) {
      invoice.client = clientExists;
    } else {
      invoice.client = await this.clientsRepository.create({
        id: parsedClient.id,
        fullName: parsedClient.fullName,
      });
    }

    const addressExists =
      await this.clientsAddressesRepository.findByStreetAddress(
        parsedAddress.streetAddress
      );

    if (addressExists) {
      invoice.address = addressExists;
    } else {
      invoice.address = await this.clientsAddressesRepository.create({
        clientId: parsedClient.id,
        ...parsedAddress,
      });
    }

    const createdInvoice = await this.invoicesRepository.create({
      clientId: invoice.client.id,
      addressId: invoice.address.id,
      price: invoice.price,
      expiresAt: invoice.expiresAt,
      relativeMonth: invoice.relativeMonth,
      relativeYear: invoice.relativeYear,
    });

    invoice.id = createdInvoice.id;

    const expensesPromise = parsedExpenses.map(async (expenseData) => {
      const expense = await this.invoicesExpensesRepository.create({
        invoiceId: invoice.id,
        ...expenseData,
      });
      return expense;
    });

    await Promise.all(expensesPromise);

    const freshInvoice = await this.invoicesRepository.findById(invoice.id);

    if (!freshInvoice) {
      throw new ServerError(
        "ErrorCreatingInvoice",
        "There was an error while creating invoice",
        400
      );
    }

    return {
      ...freshInvoice,
      energySpent: freshInvoice.energySpent,
    };
  }
}
