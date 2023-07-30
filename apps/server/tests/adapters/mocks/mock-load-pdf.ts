import { PDFDocument } from "@/domain/entities";
import { LoadPDF } from "@/domain/usecases";
import { mockInvoice, mockPdfTextContent } from "@/tests/domain/mocks";

export class MockLoadPDF implements LoadPDF {
  public async execute(path: string): Promise<PDFDocument> {
    return {
      getPage: (pageNumber: number) => {
        return Promise.resolve({
          pageNumber,
          getTextContent: async () => {
            return mockPdfTextContent(mockInvoice());
          },
        });
      },
    };
  }
}
