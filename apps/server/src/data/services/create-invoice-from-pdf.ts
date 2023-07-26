import { Invoice } from "@/domain/entities";
import {
  CreateInvoice,
  CreateInvoiceExpense,
  LoadPDF,
  ParseInvoice,
  ParseInvoiceExpenses,
} from "@/domain/usecases";

export class CreateInvoiceFromPDFService {
  constructor(
    private readonly pdfLoader: LoadPDF,
    private readonly parseInvoiceService: ParseInvoice,
    private readonly parseInvoiceExpenseService: ParseInvoiceExpenses,
    private readonly createInvoiceService: CreateInvoice,
    private readonly createInvoiceExpenseService: CreateInvoiceExpense,
  ) {}

  public async execute(pdfPath: string): Promise<Invoice | null> {
    const pdfDoc = await this.pdfLoader.execute(pdfPath);

    const page = await pdfDoc.getPage(1);

    const textContent = await page.getTextContent();

    const parsedInvoice = this.parseInvoiceService.execute(textContent);

    if(!parsedInvoice) {
      return null;
    }
    
    const parsedExpenses = this.parseInvoiceExpenseService.execute(textContent);

    parsedInvoice.expenses = parsedExpenses;

    const createdInvoice = await this.createInvoiceService.execute({
      clientId: parsedInvoice.clientId,
      expiresAt: parsedInvoice.expiresAt,
      installationNumber: parsedInvoice.installationNumber,
      relativeTo: parsedInvoice.relativeTo,
    });

    const promises = parsedExpenses.map(async expenseData => {
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
