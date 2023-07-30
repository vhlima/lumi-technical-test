import { LoadPDF } from "@/domain/usecases";
import { mockInvoice, mockPdfTextContent } from "@/tests/domain/mocks";

export class MockLoadPDF implements LoadPDF {
  public async execute(path: string): Promise<string[][]> {
    return mockPdfTextContent(mockInvoice());
  }
}
