import { Invoice } from "@/domain/entities";
import { InvoiceParsers, LoadPDF } from "@/domain/usecases";
import { ServerError } from "@/errors";
import {
  IClientsAddressesRepository,
  IClientsRepository,
  IInvoicesExpensesRepository,
  IInvoicesRepository,
} from "../contracts";
import { firstLetterUppercase } from "@/utils/string-utils";

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

    const parsedInvoice = this.invoiceParserService.execute(textContent);

    if (!parsedInvoice) {
      throw new ServerError(
        "ErrorParsingInvoice",
        "There was an error parsing this invoice",
        400
      );
    }

    if (clientId && parsedInvoice.client.id !== clientId) {
      throw new ServerError(
        "InvoiceNotFromClient",
        "This Invoice is not from the current client you are trying to upload",
        400
      );
    }

    const invoiceDateExists = await this.invoicesRepository.findByDate(
      parsedInvoice.client.id,
      parsedInvoice.address.id,
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

    const clientExists = await this.clientsRepository.findById(
      parsedInvoice.client.id
    );

    if (clientExists) {
      invoice.client = clientExists;
    } else {
      invoice.client = await this.clientsRepository.create({
        id: parsedInvoice.client.id,
        fullName: parsedInvoice.client.fullName
          .split(" ")
          .map((name) => firstLetterUppercase(name))
          .join(" "),
      });
    }

    const addressExists =
      await this.clientsAddressesRepository.findByStreetAddress(
        parsedInvoice.address.streetAddress
      );

    if (addressExists) {
      invoice.address = addressExists;
    } else {
      const { district, streetAddress, city, ...address } =
        parsedInvoice.address;

      invoice.address = await this.clientsAddressesRepository.create({
        clientId: parsedInvoice.client.id,
        ...address,
        district: district
          .split(" ")
          .map((dis) => firstLetterUppercase(dis))
          .join(" "),
        streetAddress: streetAddress
          .split(" ")
          .map((address) => firstLetterUppercase(address))
          .join(" "),
        city: firstLetterUppercase(city),
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

    const expensesPromise = parsedInvoice.expenses.map(async (expenseData) => {
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
