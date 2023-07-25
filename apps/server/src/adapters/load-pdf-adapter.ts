import fs from "fs";
import { getDocument } from "pdfjs-dist";
import { LoadPDF } from "@/domain/usecases";
import { PDFDocument } from "@/domain/entities";
import { TextItem } from "pdfjs-dist/types/src/display/api";

export class LoadPDFAdapter implements LoadPDF {
  public async execute(path: string): Promise<PDFDocument> {
    const pdfData = new Uint8Array(fs.readFileSync(path));
    
    const loadingTask = getDocument({ data: pdfData, useSystemFonts: true });

    const document = await loadingTask.promise;

    const pdfDocument = new PDFDocument();
    pdfDocument.getPage = async (pageNumber: number) => {
      const page = await document.getPage(pageNumber);

      return {
        pageNumber: page.pageNumber,
        getTextContent: async () => {
          const content = await page.getTextContent();

          return content.items as TextItem[];
        }
      }
    }

    return pdfDocument;
  }
}
