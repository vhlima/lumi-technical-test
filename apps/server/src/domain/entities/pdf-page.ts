export class PDFPage {
  pageNumber: number;
  getTextContent: () => Promise<string[][]>
}