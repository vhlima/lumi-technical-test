import { PDFText } from "./pdf-text";

export class PDFPage {
  pageNumber: number;
  getTextContent: () => Promise<PDFText[]>
}