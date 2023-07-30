import { Invoice } from "@/domain/entities";
import { LoadPDF } from "@/domain/usecases";
import { mockInvoice, mockPdfTextContent } from "@/tests/domain/mocks";

export class MockLoadPDF implements LoadPDF {
  invoice: Invoice;

  constructor() {
    this.invoice = mockInvoice();
  }

  public async execute(path: string): Promise<string[][]> {
    return mockPdfTextContent(this.invoice);
  }
}
