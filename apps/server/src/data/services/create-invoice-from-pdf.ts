import { Invoice } from "@/domain/entities";
import {
  CreateInvoice,
  CreateInvoiceExpense,
  LoadPDF,
  ParseInvoice,
} from "@/domain/usecases";

export class CreateInvoiceFromPDFService {
  constructor(
    private readonly pdfLoader: LoadPDF,
    private readonly parseInvoiceService: ParseInvoice,
    private readonly createInvoiceService: CreateInvoice,
    private readonly createInvoiceExpenseService: CreateInvoiceExpense,
  ) {}

  public async execute(pdfPath: string): Promise<Invoice> {
    const pdfDoc = await this.pdfLoader.execute(pdfPath);

    const page = await pdfDoc.getPage(1);

    const textContent = await page.getTextContent();

    const invoice = this.parseInvoiceService.execute(textContent);

    const createdInvoice = await this.createInvoiceService.execute({
      clientId: invoice.clientId,
      expiresAt: invoice.expiresAt,
      installationNumber: invoice.installationNumber,
      relativeTo: invoice.relativeTo,
    });

    const promises = invoice.expenses.map(async expenseData => {
      const expense = await this.createInvoiceExpenseService.execute({
        invoiceId: createdInvoice.id,
        ...expenseData,
      });
      return expense;
    });

    const expenses = await Promise.all(promises);
    createdInvoice.expenses = expenses;

    return createdInvoice;
  }
}
