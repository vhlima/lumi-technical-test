import { Invoice } from "@/domain/entities";
import {
  CreateClient,
  CreateInvoice,
  CreateInvoiceExpense,
  InvoiceParsers,
  LoadPDF,
} from "@/domain/usecases";

export class CreateInvoiceFromPDFService {
  constructor(
    private readonly pdfLoader: LoadPDF,
    private readonly invoiceParserService: InvoiceParsers,
    private readonly createClientService: CreateClient,
    private readonly createInvoiceService: CreateInvoice,
    private readonly createInvoiceExpenseService: CreateInvoiceExpense,
  ) {}

  public async execute(pdfPath: string): Promise<Invoice | null> {
    const pdfDoc = await this.pdfLoader.execute(pdfPath);

    const page = await pdfDoc.getPage(1);

    const textContent = await page.getTextContent();

    const parsedInvoice = await this.invoiceParserService.execute(textContent);

    if (!parsedInvoice) {
      return null;
    }

    const createdClient = await this.createClientService.execute({
      id: parsedInvoice.client.id,
      fullName: parsedInvoice.client.fullName,
    });

    console.log(`parsed invoice? ${JSON.stringify(parsedInvoice)}`)

    const createdInvoice = await this.createInvoiceService.execute({
      clientId: parsedInvoice.client.id,
      expiresAt: parsedInvoice.expiresAt,
      installationNumber: parsedInvoice.installationNumber,
      relativeTo: parsedInvoice.relativeTo,
    });

    const promises = parsedInvoice.expenses.map(async (expenseData) => {
      const expense = await this.createInvoiceExpenseService.execute({
        invoiceId: createdInvoice.id,
        ...expenseData,
      });
      return expense;
    });

    const createdExpenses = await Promise.all(promises);
    createdInvoice.expenses = createdExpenses;

    return createdInvoice;
  }
}
