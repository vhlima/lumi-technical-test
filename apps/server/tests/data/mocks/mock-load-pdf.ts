import { PDFDocument, PDFPage } from "@/domain/entities";
import { LoadPDF } from "@/domain/usecases";
import { mockPdfTextContent } from "@/tests/domain/mocks";

export class MockLoadPDFAdapter implements LoadPDF {
  
  public async execute(path: string): Promise<PDFDocument> {
    const getPage = async (pageNumber: number): Promise<PDFPage> => {
      return {
        pageNumber,
        getTextContent: async () => {
          return mockPdfTextContent();
        }
      }
    }

    return {
      getPage,
    }
  }
}
