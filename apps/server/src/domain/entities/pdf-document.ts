import { PDFPage } from "./pdf-page";

export class PDFDocument {
  getPage: (pageNumber: number) => Promise<PDFPage>;
}